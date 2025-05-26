import cron from "node-cron";
import { spawn } from "child_process";
import { logDone, logError, logStart } from "./src/lib/telegram/logs";

async function runStart() {
	logStart()
		.then(() => console.log("Log start message sent successfully."))
		.catch((err) => console.error("Error sending log start message:", err));

	const child = spawn("npm", ["run", "start"], { shell: true, stdio: "inherit", env: { ...process.env, NODE_ENV: "production" }  });

    let err = "";
	child.stderr?.on("data", (data: Buffer) => {
		err += data.toString();
	});

	child.on("close", (code: number) => {
        if (err) {
            logError(new Error(`Process encountered an error: ${err}`))
                .then(() =>
                    console.error("Log error message sent successfully.")
                )
                .catch((err) =>
                    console.error("Error sending log error message:", err)
                );
        }
		if (code === 0) {
			logDone("Cron job executed successfully.")
				.then(() => console.log("Log done message sent successfully."))
				.catch((err) => console.error("Error sending log done message:", err));
		} else {
			logError(new Error(`Process exited with code ${code}`))
				.then(() =>
					console.error("Log error message sent successfully.")
				)
				.catch((err) =>
					console.error("Error sending log error message:", err)
				);
			console.error(`Process exited with code ${code}`);
		}
	});
}

// Schedule at 09:00, 12:00, 17:00, 22:00 every day
const times = [
	"0 9 * * *",
	"0 12 * * *",
	"0 17 * * *",
	"0 22 * * *",
	"0 0 * * *",
]; // Added midnight for completeness
times.forEach((time) => {
	cron.schedule(time, runStart, {
		timezone: "Asia/Jerusalem", // Set your desired timezone
	});
});

runStart(); // Run immediately on startup

console.log("Cron jobs scheduled for 09:00, 12:00, 17:00, 22:00 daily.");
