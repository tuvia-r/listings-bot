

export interface GraphQLResponse {
  data: Data
  extensions: Extensions
  label?: string
  path?: any[]
}

export interface Data {
  node?: Node
  cursor?: string
  page_info?: PageInfo
  id?: string
  instream_extra_config?: InstreamExtraConfig
  instream_video_ad_breaks_comet: any
  video?: Video9
  attachments?: Attachment42[]
  fb_reel_react_button?: FbReelReactButton
  feedback?: Feedback33
  post_id?: string
  tracking?: string
  encrypted_tracking?: string
  click_tracking_linkshim_cb?: string
  encrypted_click_tracking?: string
  url?: string
  sponsored_data: any
  can_viewer_delete?: boolean
  can_viewer_cancel_collaboration_invite?: boolean
  can_viewer_remove_collaborator?: boolean
  can_viewer_see_collaboration_invite?: boolean
  legal_reporting_cta_type: any
  legal_reporting_uri: any
  save_info?: SaveInfo3
  to?: To5
  post_collaboration: any
  can_viewer_remove_self_as_collaborator?: boolean
  if_viewer_can_see_stars_toggle_menu_option: any
  transparency_ad_info?: TransparencyAdInfo3
  serialized_frtp_identifiers: any
  debug_info: any
}

export interface Node {
  __typename: string
  __isFeedUnit?: string
  __isCacheable?: string
  cache_id?: string
  debug_info: any
  id: string
  daspo_sto: any
  feedback?: Feedback
  is_story_civic: any
  matched_terms?: any[]
  post_id?: string
  cix_screen: any
  future_of_feed_info?: FutureOfFeedInfo
  attached_story?: AttachedStory
  bumpers: any
  comet_sections?: CometSections7
  encrypted_tracking?: string
  should_host_actor_link_in_watch?: boolean
  whatsapp_ad_context: any
  schema_context: any
  click_tracking_linkshim_cb?: string
  encrypted_click_tracking?: string
  actors?: Actor14[]
  to?: To2
  work_is_repost: any
  attachments?: Attachment30[]
  __module_operation_CometFeedUnitContainerSection_feedUnit?: ModuleOperationCometFeedUnitContainerSectionFeedUnit
  __module_component_CometFeedUnitContainerSection_feedUnit?: ModuleComponentCometFeedUnitContainerSectionFeedUnit
  __isTrackableFeedUnit?: string
  trackingdata?: Trackingdata
  viewability_config?: number[]
  client_view_config?: ClientViewConfig
  __isNode?: string
  group_feed?: GroupFeed
}

export interface Feedback {
  associated_group: AssociatedGroup
  id: string
}

export interface AssociatedGroup {
  context_actor_hovercard: string
  id: string
}

export interface FutureOfFeedInfo {
  should_reverse_message_and_attachment_position: boolean
  should_overlay_header: boolean
  aspect_ratio_update: number
  web_reshare_variant: string
}

export interface AttachedStory {
  id: string
  should_host_actor_link_in_watch: boolean
  comet_sections: CometSections
  encrypted_tracking: string
  __typename: string
  cache_id: string
  matched_terms: any[]
  post_id: string
  cix_screen: any
  future_of_feed_info: FutureOfFeedInfo3
  attached_story: any
  bumpers: any
  debug_info: any
  feedback: Feedback10
  whatsapp_ad_context: any
  schema_context: any
  click_tracking_linkshim_cb: string
  encrypted_click_tracking: string
}

export interface CometSections {
  context_layout: ContextLayout
  footer: any
  __typename: string
  content: Content
  layout: Layout
  copyright_violation_header: any
  header: any
  aymt_footer: any
  feedback: Feedback3
  outer_footer: any
  call_to_action: CallToAction
  post_inform_treatment: any
}

export interface ContextLayout {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  local_alerts_story_menu_promotion: any
  story: Story
  is_regulation_enforced: boolean
  __module_operation_CometFeedStoryContextSectionMatchRenderer_story: ModuleOperationCometFeedStoryContextSectionMatchRendererStory
  __module_component_CometFeedStoryContextSectionMatchRenderer_story: ModuleComponentCometFeedStoryContextSectionMatchRendererStory
}

export interface Story {
  id: string
  debug_info: any
  serialized_frtp_identifiers: any
  can_viewer_see_menu: boolean
  comet_sections: CometSections2
  encrypted_tracking: string
  easy_hide_button_story: any
}

export interface CometSections2 {
  actor_photo: ActorPhoto
  metadata: Metadaum[]
  title: Title
}

export interface ActorPhoto {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story2
  has_commerce_attachment: boolean
  __module_operation_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory
  __module_component_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory
}

export interface Story2 {
  actors: Actor[]
  comet_sections: CometSections3
  attachments: Attachment[]
  daspo_sto: any
  id: string
}

export interface Actor {
  __typename: string
  __isActor: string
  id: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
  story_bucket: StoryBucket
  live_video_for_comet_live_ring: any
  profile_url: string
  name: string
  profile_picture: ProfilePicture
  is_additional_profile_plus: boolean
  delegate_page?: DelegatePage
}

export interface StoryBucket {
  nodes: Node2[]
}

export interface Node2 {
  should_show_close_friend_badge: boolean
  id: string
  first_story_to_show: any
}

export interface ProfilePicture {
  uri: string
  width: number
  height: number
  scale: number
}

export interface DelegatePage {
  is_business_page_active: boolean
  id: string
}

export interface CometSections3 {
  action_link: any
}

export interface Attachment {
  action_links: ActionLink[]
}

export interface ActionLink {
  __typename: string
  link_type?: string
}

export interface ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory {
  __dr: string
}

export interface Metadaum {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  override_url: any
  video_override_url: any
  story: Story3
  __module_operation_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory
  __module_component_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory
}

export interface Story3 {
  creation_time?: number
  url?: string
  ghl_label?: GhlLabel
  id: string
  privacy_scope?: PrivacyScope
}

export interface GhlLabel {
  attributes: any[]
  styles: Style[]
  text: any
  tag: string
  children: Children[]
}

export interface Style {
  name: string
  val: string
}

export interface Children {
  attributes: Attribute[]
  styles: Style2[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute {
  name: string
  val: string
}

export interface Style2 {
  name: string
  val: string
}

export interface PrivacyScope {
  icon_image: IconImage
  description: string
}

export interface IconImage {
  name: string
}

export interface ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory {
  __dr: string
}

export interface Title {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story4
  __module_operation_CometFeedStoryTitleSectionMatchRenderer_story: ModuleOperationCometFeedStoryTitleSectionMatchRendererStory
  __module_component_CometFeedStoryTitleSectionMatchRenderer_story: ModuleComponentCometFeedStoryTitleSectionMatchRendererStory
}

export interface Story4 {
  id: string
  actors: Actor2[]
  collaborators: any[]
  title: any
  comet_sections: CometSections4
  encrypted_tracking: string
}

export interface Actor2 {
  __typename: string
  name: string
  id: string
  __isActor: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
}

export interface CometSections4 {
  action_link: any
  follow_button: any
  badge: any
}

export interface ModuleOperationCometFeedStoryTitleSectionMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryTitleSectionMatchRendererStory {
  __dr: string
}

export interface ModuleOperationCometFeedStoryContextSectionMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryContextSectionMatchRendererStory {
  __dr: string
}

export interface Content {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story5
  __module_operation_CometFeedStoryContentMatchRenderer_story: ModuleOperationCometFeedStoryContentMatchRendererStory
  __module_component_CometFeedStoryContentMatchRenderer_story: ModuleComponentCometFeedStoryContentMatchRendererStory
}

export interface Story5 {
  feedback: Feedback2
  comet_sections: CometSections5
  encrypted_tracking: string
  attachments: Attachment4[]
  future_of_feed_info: FutureOfFeedInfo2
  daspo_sto: any
  text_format_metadata: any
  post_id: string
  actors: Actor3[]
  message: Message4
  ghl_mocked_encrypted_link: string
  ghl_label_mocked_cta_button: any
  wwwURL: string
  target_group: any
  attached_story: any
  id: string
}

export interface Feedback2 {
  id: string
}

export interface CometSections5 {
  above_message: any
  info_icon: any
  attachment_overlay: any
  attached_story: any
  message: Message
  message_suffix: any
  message_container: MessageContainer
  message_sticker: any
  aggregated_stories: any
}

export interface Message {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story6
  __module_operation_CometFeedStoryMessageMatchRenderer_story: ModuleOperationCometFeedStoryMessageMatchRendererStory
  __module_component_CometFeedStoryMessageMatchRenderer_story: ModuleComponentCometFeedStoryMessageMatchRendererStory
}

export interface Story6 {
  is_text_only_story: boolean
  message: Message2
  message_truncation_line_limit: number
  sponsored_data: any
  attachments: Attachment2[]
  id: string
}

export interface Message2 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface Attachment2 {
  action_links: ActionLink2[]
}

export interface ActionLink2 {
  __typename: string
  url: string
}

export interface ModuleOperationCometFeedStoryMessageMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageMatchRendererStory {
  __dr: string
}

export interface MessageContainer {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story7
  __module_operation_CometFeedStoryMessageContainerMatchRenderer_story: ModuleOperationCometFeedStoryMessageContainerMatchRendererStory
  __module_component_CometFeedStoryMessageContainerMatchRenderer_story: ModuleComponentCometFeedStoryMessageContainerMatchRendererStory
}

export interface Story7 {
  message: Message3
  referenced_sticker: any
  attachments: Attachment3[]
  text_format_metadata: any
  comet_sections: CometSections6
  id: string
}

export interface Message3 {
  text: string
}

export interface Attachment3 {
  style_list: string[]
}

export interface CometSections6 {
  message: any
}

export interface ModuleOperationCometFeedStoryMessageContainerMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageContainerMatchRendererStory {
  __dr: string
}

export interface Attachment4 {
  deduplication_key: string
  target: Target
  __typename: string
  style_list: string[]
  styles: Styles
  throwbackStyles: any
  comet_footer_renderer: CometFooterRenderer
  comet_footer_disclaimer_renderer: any
  media: Media2
  all_subattachments: AllSubattachments2
}

export interface Target {
  __typename: string
  id: string
}

export interface Styles {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment5
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment
}

export interface Attachment5 {
  mediaset_token: string
  url: string
  all_subattachments: AllSubattachments
  comet_product_tag_feed_overlay_renderer: any
}

export interface AllSubattachments {
  count: number
  nodes: Node3[]
}

export interface Node3 {
  deduplication_key: string
  media: Media
  url: string
}

export interface Media {
  __typename: string
  is_playable: boolean
  image: Image
  viewer_image: ViewerImage
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption: string
  focus: Focus
  owner: Owner
  __isNode: string
}

export interface Image {
  uri: string
  height: number
  width: number
}

export interface ViewerImage {
  height: number
  width: number
  uri: string
}

export interface Focus {
  x: number
  y: number
}

export interface Owner {
  __typename: string
  id: string
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment {
  __dr: string
}

export interface CometFooterRenderer {
  __typename: string
  attachment: Attachment6
  __module_operation_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment
  __module_component_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment
}

export interface Attachment6 {
  ghl_mocked_footer_info?: GhlMockedFooterInfo
  action_links?: ActionLink3[]
  headline_line_limit?: number
  source: any
  call_to_action_renderer?: CallToActionRenderer
  story_attachment_link_renderer?: StoryAttachmentLinkRenderer
}

export interface GhlMockedFooterInfo {
  headline: string
  footer_body: string
  link: string
  meta: string
  cta_button: CtaButton
}

export interface CtaButton {
  attributes: any[]
  styles: Style3[]
  text: any
  tag: string
  children: Children2[]
}

export interface Style3 {
  name: string
  val: string
}

export interface Children2 {
  attributes: Attribute2[]
  styles: Style4[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute2 {
  name: string
  val: string
}

export interface Style4 {
  name: string
  val: string
}

export interface ActionLink3 {
  __typename: string
  destination_type?: string
  link_title?: string
  link_description?: string
}

export interface CallToActionRenderer {
  __typename: string
  action_link: ActionLink4
  __module_operation_CometFeedStoryCallToAction_attachment: ModuleOperationCometFeedStoryCallToActionAttachment
  __module_component_CometFeedStoryCallToAction_attachment: ModuleComponentCometFeedStoryCallToActionAttachment
}

export interface ActionLink4 {
  __typename: string
  destination_type: string
  stateful_title: string
  title: string
  ghl_title: GhlTitle
  url: string
  link_type: string
  fbclid: string
  post_id: string
  page: Page
}

export interface GhlTitle {
  attributes: any[]
  styles: Style5[]
  text: any
  tag: string
  children: Children3[]
  __module_operation_CometFeedAttachmentLinkOpenCallToAction_actionLink: ModuleOperationCometFeedAttachmentLinkOpenCallToActionActionLink
  __module_component_CometFeedAttachmentLinkOpenCallToAction_actionLink: ModuleComponentCometFeedAttachmentLinkOpenCallToActionActionLink
}

export interface Style5 {
  name: string
  val: string
}

export interface Children3 {
  attributes: Attribute3[]
  styles: Style6[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute3 {
  name: string
  val: string
}

export interface Style6 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedAttachmentLinkOpenCallToActionActionLink {
  __dr: string
}

export interface ModuleComponentCometFeedAttachmentLinkOpenCallToActionActionLink {
  __dr: string
}

export interface Page {
  id: string
}

export interface ModuleOperationCometFeedStoryCallToActionAttachment {
  __dr: string
}

export interface ModuleComponentCometFeedStoryCallToActionAttachment {
  __dr: string
}

export interface StoryAttachmentLinkRenderer {
  __typename: string
  attachment: Attachment7
  __module_operation_CometFeedStoryLink_attachment: ModuleOperationCometFeedStoryLinkAttachment
  __module_component_CometFeedStoryLink_attachment: ModuleComponentCometFeedStoryLinkAttachment
}

export interface Attachment7 {
  web_link: WebLink
  action_links: ActionLink5[]
  url: string
}

export interface WebLink {
  __typename: string
  url: string
  fbclid: any
  lynx_mode: string
}

export interface ActionLink5 {
  __typename: string
  url: string
}

export interface ModuleOperationCometFeedStoryLinkAttachment {
  __dr: string
}

export interface ModuleComponentCometFeedStoryLinkAttachment {
  __dr: string
}

export interface ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment {
  __dr: string
}

export interface Media2 {
  __typename: string
  __isNode: string
  id: string
}

export interface AllSubattachments2 {
  nodes: Node4[]
}

export interface Node4 {
  media: Media3
}

export interface Media3 {
  __typename: string
  __isNode: string
  id: string
}

export interface FutureOfFeedInfo2 {
  dominant_readable_color?: string
}

export interface Actor3 {
  __typename: string
  id: string
  name: string
  __isEntity: string
  url: string
}

export interface Message4 {
  __typename: string
  text: string
}

export interface ModuleOperationCometFeedStoryContentMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryContentMatchRendererStory {
  __dr: string
}

export interface Layout {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  __module_operation_CometFeedStoryLayoutMatchRenderer_story: ModuleOperationCometFeedStoryLayoutMatchRendererStory
  __module_component_CometFeedStoryLayoutMatchRenderer_story: ModuleComponentCometFeedStoryLayoutMatchRendererStory
}

export interface ModuleOperationCometFeedStoryLayoutMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryLayoutMatchRendererStory {
  __dr: string
}

export interface Feedback3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story8
  __module_operation_CometFeedStoryFeedbackSection_story: ModuleOperationCometFeedStoryFeedbackSectionStory
  __module_component_CometFeedStoryFeedbackSection_story: ModuleComponentCometFeedStoryFeedbackSectionStory
}

export interface Story8 {
  feedback_context: FeedbackContext
  story_ufi_container: StoryUfiContainer
  id: string
}

export interface FeedbackContext {
  feedback_target_with_context: FeedbackTargetWithContext
}

export interface FeedbackTargetWithContext {
  viewer_actor: ViewerActor
  id: string
}

export interface ViewerActor {
  __typename: string
  id: string
}

export interface StoryUfiContainer {
  __typename: string
  story: Story9
  __module_operation_CometFeedUFIContainer_story: ModuleOperationCometFeedUficontainerStory
  __module_component_CometFeedUFIContainer_story: ModuleComponentCometFeedUficontainerStory
}

export interface Story9 {
  encrypted_tracking: string
  is_text_only_story: boolean
  feedback_context: FeedbackContext2
  shareable_from_perspective_of_feed_ufi: ShareableFromPerspectiveOfFeedUfi
  id: string
  url: string
  post_id: string
  tracking: string
  daspo_sto: any
  inform_treatment_for_messaging: any
  target_group: any
  click_tracking_linkshim_cb: string
  encrypted_click_tracking: string
  __module_operation_useCometUFIAdaptivePostActionBar_story: ModuleOperationUseCometUfiadaptivePostActionBarStory
  __module_component_useCometUFIAdaptivePostActionBar_story: ModuleComponentUseCometUfiadaptivePostActionBarStory
  vote_attachments: any[]
  feed_backend_data: FeedBackendData
}

export interface FeedbackContext2 {
  feedback_target_with_context: FeedbackTargetWithContext2
  interesting_top_level_comments: InterestingTopLevelComment[]
}

export interface FeedbackTargetWithContext2 {
  id: string
  owning_profile: OwningProfile
  can_viewer_comment: boolean
  comment_rendering_instance: CommentRenderingInstance
  comet_ufi_summary_and_actions_renderer: CometUfiSummaryAndActionsRenderer
  is_community_qa_or_qaish_post: boolean
  threading_config?: ThreadingConfig
  actor_provider: ActorProvider
  viewer_actor: ViewerActor5
  url: string
  __typename: string
  if_viewer_can_comment_anonymously: any
  plugins: Plugin[]
  comment_composer_placeholder: string
  have_comments_been_disabled: boolean
  default_comment_ordering_mode: string
  inline_composer_visible_by_default: boolean
  associated_group: any
  work_comment_summaries_from_feedback: any
  are_live_video_comments_disabled: boolean
  is_viewer_muted: boolean
  comments_disabled_notice_renderer: CommentsDisabledNoticeRenderer
  comment_moderation_filter_restriction_notice: any
}

export interface OwningProfile {
  __typename: string
  name: string
  short_name: string
  id: string
}

export interface CommentRenderingInstance {
  comments: Comments
}

export interface Comments {
  total_count: number
}

export interface CometUfiSummaryAndActionsRenderer {
  __typename: string
  feedback: Feedback4
  __module_operation_CometUFISummaryAndActions_feedback: ModuleOperationCometUfisummaryAndActionsFeedback
  __module_component_CometUFISummaryAndActions_feedback: ModuleComponentCometUfisummaryAndActionsFeedback
}

export interface Feedback4 {
  id: string
  subscription_target_id: string
  i18n_reaction_count: string
  important_reactors: ImportantReactors
  reaction_count: ReactionCount
  top_reactions: TopReactions
  reaction_display_config: ReactionDisplayConfig
  viewer_actor: ViewerActor2
  viewer_feedback_reaction_info: any
  can_show_seen_by: boolean
  if_viewer_can_see_seen_by_member_list: any
  if_viewer_cannot_see_seen_by_member_list: IfViewerCannotSeeSeenByMemberList
  i18n_share_count: string
  share_count: ShareCount
  comments_count_summary_renderer: CommentsCountSummaryRenderer
  associated_video: any
  comment_rendering_instance: CommentRenderingInstance3
  page_private_reply: any
  video_view_count: any
  video_view_count_renderer: any
  is_similar_cqa_question: boolean
  message_action: any
  ufi_action_renderers: UfiActionRenderer[]
  should_show_reshare_warning: boolean
  adaptive_ufi_action_renderers: AdaptiveUfiActionRenderer[]
}

export interface ImportantReactors {
  nodes: any[]
}

export interface ReactionCount {
  count: number
  is_empty: boolean
}

export interface TopReactions {
  count: number
  edges: Edge[]
}

export interface Edge {
  visible_in_bling_bar: boolean
  node: Node5
  i18n_reaction_count: string
  reaction_count: number
}

export interface Node5 {
  id: string
  localized_name: string
}

export interface ReactionDisplayConfig {
  reaction_display_strategy: string
  reaction_string_with_viewer: any
  reaction_string_without_viewer: any
  __module_operation_CometUFIReactionsCount_feedback: ModuleOperationCometUfireactionsCountFeedback
  __module_component_CometUFIReactionsCount_feedback: ModuleComponentCometUfireactionsCountFeedback
}

export interface ModuleOperationCometUfireactionsCountFeedback {
  __dr: string
}

export interface ModuleComponentCometUfireactionsCountFeedback {
  __dr: string
}

export interface ViewerActor2 {
  __typename: string
  id: string
  name: string
}

export interface IfViewerCannotSeeSeenByMemberList {
  i18n_reaction_count: string
  reaction_count: ReactionCount2
  reaction_display_config: ReactionDisplayConfig2
  seen_by: SeenBy
  __module_operation_CometUFISeenByCount_feedback__if_viewer_cannot_see_seen_by_member_list: ModuleOperationCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList
  __module_component_CometUFISeenByCount_feedback__if_viewer_cannot_see_seen_by_member_list: ModuleComponentCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList
  id: string
}

export interface ReactionCount2 {
  count: number
}

export interface ReactionDisplayConfig2 {
  reaction_display_strategy: string
}

export interface SeenBy {
  count: number
  i18n_seen_by_count: any
  seen_by_everyone: boolean
}

export interface ModuleOperationCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList {
  __dr: string
}

export interface ModuleComponentCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList {
  __dr: string
}

export interface ShareCount {
  count: number
  is_empty: boolean
}

export interface CommentsCountSummaryRenderer {
  __typename: string
  feedback: Feedback5
  __module_operation_CometUFISummaryBase_feedback: ModuleOperationCometUfisummaryBaseFeedback
  __module_component_CometUFISummaryBase_feedback: ModuleComponentCometUfisummaryBaseFeedback
}

export interface Feedback5 {
  id: string
  comment_rendering_instance: CommentRenderingInstance2
}

export interface CommentRenderingInstance2 {
  comments: Comments2
}

export interface Comments2 {
  total_count: number
}

export interface ModuleOperationCometUfisummaryBaseFeedback {
  __dr: string
}

export interface ModuleComponentCometUfisummaryBaseFeedback {
  __dr: string
}

export interface CommentRenderingInstance3 {
  comments: Comments3
}

export interface Comments3 {
  total_count: number
}

export interface UfiActionRenderer {
  __typename: string
  feedback?: Feedback6
  hideLabelForAMA?: boolean
  __module_operation_useCometUFIPostActionBar_feedback__ufi_action_renderers: ModuleOperationUseCometUfipostActionBarFeedbackUfiActionRenderers
  __module_component_useCometUFIPostActionBar_feedback__ufi_action_renderers: ModuleComponentUseCometUfipostActionBarFeedbackUfiActionRenderers
}

export interface Feedback6 {
  viewer_feedback_reaction_info: any
  supported_reaction_infos: SupportedReactionInfo[]
  comet_ufi_reaction_icon_renderer: CometUfiReactionIconRenderer
  id: string
  viewer_actor: ViewerActor3
}

export interface SupportedReactionInfo {
  animation: Animation
  id: string
}

export interface Animation {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback
}

export interface ModuleOperationCometUfireactionStrategyFeedback {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback {
  __dr: string
}

export interface ViewerActor3 {
  __typename: string
  id: string
}

export interface ModuleOperationUseCometUfipostActionBarFeedbackUfiActionRenderers {
  __dr: string
}

export interface ModuleComponentUseCometUfipostActionBarFeedbackUfiActionRenderers {
  __dr: string
}

export interface AdaptiveUfiActionRenderer {
  __typename: string
  feedback?: Feedback7
  hideLabelForAMA?: boolean
  __module_operation_useCometUFIAdaptivePostActionBar_feedback: ModuleOperationUseCometUfiadaptivePostActionBarFeedback
  __module_component_useCometUFIAdaptivePostActionBar_feedback: ModuleComponentUseCometUfiadaptivePostActionBarFeedback
}

export interface Feedback7 {
  id: string
  should_show_reshare_warning?: boolean
  viewer_feedback_reaction_info: any
  supported_reaction_infos?: SupportedReactionInfo2[]
  comet_ufi_reaction_icon_renderer?: CometUfiReactionIconRenderer2
  viewer_actor?: ViewerActor4
}

export interface SupportedReactionInfo2 {
  animation: Animation2
  id: string
}

export interface Animation2 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer2 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback2
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback2
}

export interface ModuleOperationCometUfireactionStrategyFeedback2 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback2 {
  __dr: string
}

export interface ViewerActor4 {
  __typename: string
  id: string
}

export interface ModuleOperationUseCometUfiadaptivePostActionBarFeedback {
  __dr: string
}

export interface ModuleComponentUseCometUfiadaptivePostActionBarFeedback {
  __dr: string
}

export interface ModuleOperationCometUfisummaryAndActionsFeedback {
  __dr: string
}

export interface ModuleComponentCometUfisummaryAndActionsFeedback {
  __dr: string
}

export interface ThreadingConfig {
  __typename: string
}

export interface ActorProvider {
  __typename: string
  current_actor: CurrentActor
  id: string
}

export interface CurrentActor {
  __typename: string
  id: string
  __isActor: string
  name: string
  profile_picture_depth_0: ProfilePictureDepth0
  profile_picture_depth_1: ProfilePictureDepth1
  gender: string
}

export interface ProfilePictureDepth0 {
  uri: string
}

export interface ProfilePictureDepth1 {
  uri: string
}

export interface ViewerActor5 {
  __typename: string
  id: string
}

export interface Plugin {
  __typename: string
  context_id: any
  post_id?: string
  __module_operation_useCometUFIComposerPlugins_feedback: ModuleOperationUseCometUficomposerPluginsFeedback
  __module_component_useCometUFIComposerPlugins_feedback: ModuleComponentUseCometUficomposerPluginsFeedback
  has_avatar?: boolean
  feedback_id?: string
  avatar_style_version: any
  emoji_size?: number
  viewer_actor?: ViewerActor6
  should_condense_video_preview?: boolean
  owning_profile_id?: string
}

export interface ModuleOperationUseCometUficomposerPluginsFeedback {
  __dr: string
}

export interface ModuleComponentUseCometUficomposerPluginsFeedback {
  __dr: string
}

export interface ViewerActor6 {
  __typename: string
  id: string
}

export interface CommentsDisabledNoticeRenderer {
  __typename: string
  notice_message: NoticeMessage
  __module_operation_CometUFICommentDisabledNotice_feedback: ModuleOperationCometUficommentDisabledNoticeFeedback
  __module_component_CometUFICommentDisabledNotice_feedback: ModuleComponentCometUficommentDisabledNoticeFeedback
}

export interface NoticeMessage {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface ModuleOperationCometUficommentDisabledNoticeFeedback {
  __dr: string
}

export interface ModuleComponentCometUficommentDisabledNoticeFeedback {
  __dr: string
}

export interface InterestingTopLevelComment {
  comment: Comment
  relevant_contextual_replies: RelevantContextualReplies
}

export interface Comment {
  id: string
  legacy_fbid: string
  depth: number
  body: Body
  attachments: any[]
  is_markdown_enabled: boolean
  community_comment_signal_renderer: any
  comment_menu_tooltip: string
  should_show_comment_menu: boolean
  author: Author
  is_author_weak_reference: boolean
  comment_action_links: CommentActionLink[]
  feedback: Feedback9
  preferred_body: PreferredBody
  body_renderer: BodyRenderer
  comment_parent: any
  is_declined_by_group_admin_assistant: boolean
  is_gaming_video_comment: boolean
  timestamp_in_video: any
  translatability_for_viewer: TranslatabilityForViewer
  written_while_video_was_live: boolean
  group_comment_info: any
  bizweb_comment_info: any
  has_constituent_badge: boolean
  can_viewer_see_subsribe_button: boolean
  can_see_constituent_badge_upsell: boolean
  legacy_token: string
  parent_feedback: ParentFeedback
  question_and_answer_type: any
  author_user_signals_renderer: any
  author_badge_renderers: any[]
  identity_badges_web: any[]
  can_show_multiple_identity_badges: boolean
  discoverable_identity_badges_web: DiscoverableIdentityBadgesWeb[]
  user: User
  is_viewer_comment_poster: boolean
  parent_post_story: ParentPostStory
  work_ama_answer_status: any
  work_knowledge_inline_annotation_comment_badge_renderer: any
  business_comment_attributes: any[]
  is_live_video_comment: boolean
  created_time: number
  translation_available_for_viewer: boolean
  inline_survey_config: any
  spam_display_mode: string
  attached_story: any
  comment_direct_parent: any
  if_viewer_can_see_member_page_tooltip: any
  is_disabled: boolean
  work_answered_event_comment_renderer: any
  comment_upper_badge_renderer: any
  elevated_comment_data: any
  inline_replies_expander_renderer?: InlineRepliesExpanderRenderer
}

export interface Body {
  text: string
  ranges: Range[]
}

export interface Range {
  __typename: string
  entity: Entity
  entity_is_weak_reference: boolean
  length: number
  offset: number
}

export interface Entity {
  __typename: string
  __isNode: string
  id: string
}

export interface Author {
  __typename: string
  id: string
  name: string
  __isActor: string
  profile_picture_depth_0: ProfilePictureDepth02
  profile_picture_depth_1: ProfilePictureDepth12
  gender: string
  __isEntity: string
  url: string
  work_info: any
  is_verified: boolean
  short_name: string
  subscribe_status: string
}

export interface ProfilePictureDepth02 {
  uri: string
}

export interface ProfilePictureDepth12 {
  uri: string
}

export interface CommentActionLink {
  __typename: string
  comment: Comment2
  __module_operation_CometUFICommentActionLinks_comment: ModuleOperationCometUficommentActionLinksComment
  __module_component_CometUFICommentActionLinks_comment: ModuleComponentCometUficommentActionLinksComment
}

export interface Comment2 {
  id: string
  created_time?: number
  url?: string
  is_live_video_comment?: boolean
  feedback?: Feedback8
  comment_parent: any
  is_author_weak_reference?: boolean
  legacy_fbid?: string
  author?: Author2
}

export interface Feedback8 {
  comment_composer_placeholder?: string
  id: string
  viewer_feedback_reaction_info: any
  viewer_actor?: ViewerActor7
  supported_reaction_infos?: SupportedReactionInfo3[]
  comet_ufi_reaction_icon_renderer?: CometUfiReactionIconRenderer3
  associated_video: any
  top_reactions?: TopReactions2
  unified_reactors?: UnifiedReactors
  reactors?: Reactors
}

export interface ViewerActor7 {
  __typename: string
  id: string
}

export interface SupportedReactionInfo3 {
  animation: Animation3
  id: string
}

export interface Animation3 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer3 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback3
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback3
}

export interface ModuleOperationCometUfireactionStrategyFeedback3 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback3 {
  __dr: string
}

export interface TopReactions2 {
  edges: any[]
}

export interface UnifiedReactors {
  count: number
}

export interface Reactors {
  count: number
  is_empty: boolean
}

export interface Author2 {
  __typename: string
  id: string
  name: string
  url: string
}

export interface ModuleOperationCometUficommentActionLinksComment {
  __dr: string
}

export interface ModuleComponentCometUficommentActionLinksComment {
  __dr: string
}

export interface Feedback9 {
  viewer_feedback_reaction_info: any
  id: string
  top_reactions: TopReactions3
  reactors: Reactors2
  total_reply_count: number
  viewer_actor: ViewerActor8
  actor_provider: ActorProvider2
  url: string
  __typename: string
  if_viewer_can_comment_anonymously: any
  plugins: Plugin2[]
  comment_composer_placeholder: string
  can_viewer_comment: boolean
  have_comments_been_disabled: boolean
  default_comment_ordering_mode: string
  inline_composer_visible_by_default: boolean
  comment_rendering_instance: any
  associated_group: any
}

export interface TopReactions3 {
  edges: any[]
}

export interface Reactors2 {
  count_reduced: string
}

export interface ViewerActor8 {
  __typename: string
  id: string
}

export interface ActorProvider2 {
  __typename: string
  current_actor: CurrentActor2
  id: string
}

export interface CurrentActor2 {
  __typename: string
  id: string
  __isActor: string
  name: string
  profile_picture_depth_0: ProfilePictureDepth03
  profile_picture_depth_1: ProfilePictureDepth13
  gender: string
}

export interface ProfilePictureDepth03 {
  uri: string
}

export interface ProfilePictureDepth13 {
  uri: string
}

export interface Plugin2 {
  __typename: string
  context_id: any
  post_id?: string
  __module_operation_useCometUFIComposerPlugins_feedback: ModuleOperationUseCometUficomposerPluginsFeedback2
  __module_component_useCometUFIComposerPlugins_feedback: ModuleComponentUseCometUficomposerPluginsFeedback2
  has_avatar?: boolean
  feedback_id?: string
  avatar_style_version: any
  emoji_size?: number
  owning_profile_id?: string
  viewer_actor?: ViewerActor9
  should_condense_video_preview?: boolean
}

export interface ModuleOperationUseCometUficomposerPluginsFeedback2 {
  __dr: string
}

export interface ModuleComponentUseCometUficomposerPluginsFeedback2 {
  __dr: string
}

export interface ViewerActor9 {
  __typename: string
  id: string
}

export interface PreferredBody {
  __typename: string
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: Range2[]
  color_ranges: any[]
  text: string
  translation_type: string
}

export interface Range2 {
  entity: Entity2
  entity_is_weak_reference: boolean
  length: number
  offset: number
}

export interface Entity2 {
  __typename: string
  __isEntity: string
  __isActor: string
  id: string
  url: string
  profile_url: string
  short_name: string
  work_info: any
  __module_operation_CometTextWithEntitiesRelay_textWithEntities: ModuleOperationCometTextWithEntitiesRelayTextWithEntities
  __module_component_CometTextWithEntitiesRelay_textWithEntities: ModuleComponentCometTextWithEntitiesRelayTextWithEntities
  work_foreign_entity_info: any
  is_verified: boolean
  mobileUrl: string
  __isNode: string
}

export interface ModuleOperationCometTextWithEntitiesRelayTextWithEntities {
  __dr: string
}

export interface ModuleComponentCometTextWithEntitiesRelayTextWithEntities {
  __dr: string
}

export interface BodyRenderer {
  __typename: string
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: Range3[]
  color_ranges: any[]
  text: string
  __module_operation_CometUFICommentTextBodyRenderer_comment: ModuleOperationCometUficommentTextBodyRendererComment
  __module_component_CometUFICommentTextBodyRenderer_comment: ModuleComponentCometUficommentTextBodyRendererComment
}

export interface Range3 {
  entity: Entity3
  entity_is_weak_reference: boolean
  length: number
  offset: number
}

export interface Entity3 {
  __typename: string
  __isEntity: string
  __isActor: string
  id: string
  url: string
  profile_url: string
  short_name: string
  work_info: any
  __module_operation_CometTextWithEntitiesRelay_textWithEntities: ModuleOperationCometTextWithEntitiesRelayTextWithEntities2
  __module_component_CometTextWithEntitiesRelay_textWithEntities: ModuleComponentCometTextWithEntitiesRelayTextWithEntities2
  work_foreign_entity_info: any
  is_verified: boolean
  mobileUrl: string
  __isNode: string
}

export interface ModuleOperationCometTextWithEntitiesRelayTextWithEntities2 {
  __dr: string
}

export interface ModuleComponentCometTextWithEntitiesRelayTextWithEntities2 {
  __dr: string
}

export interface ModuleOperationCometUficommentTextBodyRendererComment {
  __dr: string
}

export interface ModuleComponentCometUficommentTextBodyRendererComment {
  __dr: string
}

export interface TranslatabilityForViewer {
  source_dialect: string
}

export interface ParentFeedback {
  id: string
  share_fbid: string
  political_figure_data: any
  owning_profile: OwningProfile2
}

export interface OwningProfile2 {
  __typename: string
  name: string
  id: string
}

export interface DiscoverableIdentityBadgesWeb {
  grey_badge_asset: string
  dark_mode_badge_asset: string
  light_mode_badge_asset: string
  is_earned: boolean
  information_title: string
  information_description: string
  is_enabled: boolean
  is_manageable: boolean
  serialized: string
  identity_badge_type: string
  information_button_enabled: boolean
  information_button_uri: string
  information_button_text: string
  tier_info: any
}

export interface User {
  name: string
  profile_picture: ProfilePicture2
  id: string
}

export interface ProfilePicture2 {
  uri: string
}

export interface ParentPostStory {
  attachments: Attachment8[]
  id: string
}

export interface Attachment8 {
  media: Media4
}

export interface Media4 {
  __typename: string
  __isNode: string
  id: string
}

export interface InlineRepliesExpanderRenderer {
  __typename: string
  interesting_reply: InterestingReply
  __module_operation_CometUFIInlineRepliesExpander_comment: ModuleOperationCometUfiinlineRepliesExpanderComment
  __module_component_CometUFIInlineRepliesExpander_comment: ModuleComponentCometUfiinlineRepliesExpanderComment
}

export interface InterestingReply {
  author: Author3
  created_time: number
  id: string
}

export interface Author3 {
  __typename: string
  name: string
  profilePictureForReplyExpander: ProfilePictureForReplyExpander
  gender: string
  ufi_silhouette_uri: string
  id: string
}

export interface ProfilePictureForReplyExpander {
  uri: string
}

export interface ModuleOperationCometUfiinlineRepliesExpanderComment {
  __dr: string
}

export interface ModuleComponentCometUfiinlineRepliesExpanderComment {
  __dr: string
}

export interface RelevantContextualReplies {
  nodes: any[]
}

export interface ShareableFromPerspectiveOfFeedUfi {
  __typename: string
  __isEntity: string
  url: string
  __isNode: string
  id: string
  post_id: string
}

export interface ModuleOperationUseCometUfiadaptivePostActionBarStory {
  __dr: string
}

export interface ModuleComponentUseCometUfiadaptivePostActionBarStory {
  __dr: string
}

export interface FeedBackendData {
  pcomment: number
}

export interface ModuleOperationCometFeedUficontainerStory {
  __dr: string
}

export interface ModuleComponentCometFeedUficontainerStory {
  __dr: string
}

export interface ModuleOperationCometFeedStoryFeedbackSectionStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryFeedbackSectionStory {
  __dr: string
}

export interface CallToAction {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story10
  __module_operation_CometFeedStoryCallToActionSection_story: ModuleOperationCometFeedStoryCallToActionSectionStory
  __module_component_CometFeedStoryCallToActionSection_story: ModuleComponentCometFeedStoryCallToActionSectionStory
}

export interface Story10 {
  bumpers: any
  tracking: string
  id: string
}

export interface ModuleOperationCometFeedStoryCallToActionSectionStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryCallToActionSectionStory {
  __dr: string
}

export interface FutureOfFeedInfo3 {
  should_reverse_message_and_attachment_position: boolean
  should_overlay_header: boolean
  aspect_ratio_update: number
  web_reshare_variant: string
}

export interface Feedback10 {
  id: string
  associated_group: any
}

export interface CometSections7 {
  __typename: string
  content: Content2
  layout: Layout2
  copyright_violation_header: any
  header: any
  context_layout: ContextLayout2
  aymt_footer: any
  footer: any
  feedback: Feedback14
  outer_footer: any
  call_to_action: CallToAction2
  post_inform_treatment: any
  action_link: ActionLink17
  timestamp: Timestamp
}

export interface Content2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story11
  __module_operation_CometFeedStoryContentMatchRenderer_story: ModuleOperationCometFeedStoryContentMatchRendererStory2
  __module_component_CometFeedStoryContentMatchRenderer_story: ModuleComponentCometFeedStoryContentMatchRendererStory2
}

export interface Story11 {
  feedback?: Feedback11
  comet_sections: CometSections8
  encrypted_tracking: string
  attachments: Attachment18[]
  future_of_feed_info: FutureOfFeedInfo4
  daspo_sto: any
  text_format_metadata?: TextFormatMetadata3
  post_id: string
  actors: Actor7[]
  message?: Message13
  ghl_mocked_encrypted_link: string
  ghl_label_mocked_cta_button: any
  wwwURL: string
  target_group?: TargetGroup2
  attached_story?: AttachedStory4
  id: string
}

export interface Feedback11 {
  id: string
}

export interface CometSections8 {
  above_message: any
  info_icon: any
  attachment_overlay: any
  attached_story?: AttachedStory2
  message?: Message9
  message_suffix: any
  message_container?: MessageContainer3
  message_sticker: any
  aggregated_stories: any
}

export interface AttachedStory2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story12
  __module_operation_CometFeedStoryAttachedStoryMatchRenderer_story: ModuleOperationCometFeedStoryAttachedStoryMatchRendererStory
  __module_component_CometFeedStoryAttachedStoryMatchRenderer_story: ModuleComponentCometFeedStoryAttachedStoryMatchRendererStory
}

export interface Story12 {
  attached_story: AttachedStory3
  id: string
}

export interface AttachedStory3 {
  id: string
  encrypted_tracking: string
  comet_sections: CometSections9
}

export interface CometSections9 {
  attached_story_layout: AttachedStoryLayout
  attached_story: any
}

export interface AttachedStoryLayout {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story13
  __module_operation_CometFeedStoryAttachedStory_story: ModuleOperationCometFeedStoryAttachedStoryStory
  __module_component_CometFeedStoryAttachedStory_story: ModuleComponentCometFeedStoryAttachedStoryStory
}

export interface Story13 {
  comet_sections: CometSections10
  encrypted_tracking: string
  should_host_actor_link_in_watch: boolean
  attachments: Attachment12[]
  sponsored_data: any
  text_format_metadata: any
  message: Message8
  is_text_only_story: boolean
  id: string
}

export interface CometSections10 {
  metadata: Metadaum2[]
  title: Title2
  actor_photo: ActorPhoto2
  info_icon: any
  attachment_overlay: any
  message: Message5
  message_suffix: any
  message_container: MessageContainer2
  message_sticker: any
}

export interface Metadaum2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  override_url: any
  video_override_url: any
  story: Story14
  __module_operation_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory2
  __module_component_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory2
}

export interface Story14 {
  creation_time?: number
  url?: string
  ghl_label?: GhlLabel2
  id: string
  privacy_scope?: PrivacyScope2
}

export interface GhlLabel2 {
  attributes: any[]
  styles: Style7[]
  text: any
  tag: string
  children: Children4[]
}

export interface Style7 {
  name: string
  val: string
}

export interface Children4 {
  attributes: Attribute4[]
  styles: Style8[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute4 {
  name: string
  val: string
}

export interface Style8 {
  name: string
  val: string
}

export interface PrivacyScope2 {
  icon_image: IconImage2
  description: string
}

export interface IconImage2 {
  name: string
}

export interface ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory2 {
  __dr: string
}

export interface Title2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story15
  __module_operation_CometFeedStoryTitleSectionMatchRenderer_story: ModuleOperationCometFeedStoryTitleSectionMatchRendererStory2
  __module_component_CometFeedStoryTitleSectionMatchRenderer_story: ModuleComponentCometFeedStoryTitleSectionMatchRendererStory2
}

export interface Story15 {
  id: string
  actors: Actor4[]
  collaborators: any[]
  title: any
  comet_sections: CometSections11
  encrypted_tracking: string
}

export interface Actor4 {
  __typename: string
  name: string
  id: string
  __isActor: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
}

export interface CometSections11 {
  action_link: any
  follow_button: any
  badge: any
}

export interface ModuleOperationCometFeedStoryTitleSectionMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryTitleSectionMatchRendererStory2 {
  __dr: string
}

export interface ActorPhoto2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story16
  has_commerce_attachment: boolean
  __module_operation_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory2
  __module_component_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory2
}

export interface Story16 {
  actors: Actor5[]
  comet_sections: CometSections12
  attachments: Attachment9[]
  daspo_sto: any
  id: string
}

export interface Actor5 {
  __typename: string
  __isActor: string
  id: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
  story_bucket: StoryBucket2
  live_video_for_comet_live_ring: any
  profile_url: string
  name: string
  profile_picture: ProfilePicture3
  is_additional_profile_plus: boolean
  delegate_page?: DelegatePage2
}

export interface StoryBucket2 {
  nodes: Node6[]
}

export interface Node6 {
  should_show_close_friend_badge: boolean
  id: string
  first_story_to_show: any
}

export interface ProfilePicture3 {
  uri: string
  width: number
  height: number
  scale: number
}

export interface DelegatePage2 {
  is_business_page_active: boolean
  id: string
}

export interface CometSections12 {
  action_link: any
}

export interface Attachment9 {
  action_links: ActionLink6[]
}

export interface ActionLink6 {
  __typename: string
  link_type?: string
}

export interface ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory2 {
  __dr: string
}

export interface Message5 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story17
  __module_operation_CometFeedStoryMessageMatchRenderer_story: ModuleOperationCometFeedStoryMessageMatchRendererStory2
  __module_component_CometFeedStoryMessageMatchRenderer_story: ModuleComponentCometFeedStoryMessageMatchRendererStory2
}

export interface Story17 {
  is_text_only_story: boolean
  message: Message6
  message_truncation_line_limit: number
  sponsored_data: any
  attachments: Attachment10[]
  id: string
}

export interface Message6 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface Attachment10 {
  action_links: ActionLink7[]
}

export interface ActionLink7 {
  __typename: string
  url: string
}

export interface ModuleOperationCometFeedStoryMessageMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageMatchRendererStory2 {
  __dr: string
}

export interface MessageContainer2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story18
  __module_operation_CometFeedStoryMessageContainerMatchRenderer_story: ModuleOperationCometFeedStoryMessageContainerMatchRendererStory2
  __module_component_CometFeedStoryMessageContainerMatchRenderer_story: ModuleComponentCometFeedStoryMessageContainerMatchRendererStory2
}

export interface Story18 {
  message: Message7
  referenced_sticker: any
  attachments: Attachment11[]
  text_format_metadata: any
  comet_sections: CometSections13
  id: string
}

export interface Message7 {
  text: string
}

export interface Attachment11 {
  style_list: string[]
}

export interface CometSections13 {
  message: any
}

export interface ModuleOperationCometFeedStoryMessageContainerMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageContainerMatchRendererStory2 {
  __dr: string
}

export interface Attachment12 {
  deduplication_key: string
  __typename: string
  style_list: string[]
  styles: Styles2
  throwbackStyles: any
  comet_footer_renderer: CometFooterRenderer2
}

export interface Styles2 {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment13
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment2
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment2
}

export interface Attachment13 {
  mediaset_token: string
  url: string
  all_subattachments: AllSubattachments3
  comet_product_tag_feed_overlay_renderer: any
}

export interface AllSubattachments3 {
  count: number
  nodes: Node7[]
}

export interface Node7 {
  deduplication_key: string
  media: Media5
  url: string
}

export interface Media5 {
  __typename: string
  is_playable: boolean
  image: Image2
  viewer_image: ViewerImage2
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption: string
  focus: Focus2
  owner: Owner2
  __isNode: string
}

export interface Image2 {
  uri: string
  height: number
  width: number
}

export interface ViewerImage2 {
  height: number
  width: number
  uri: string
}

export interface Focus2 {
  x: number
  y: number
}

export interface Owner2 {
  __typename: string
  id: string
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment2 {
  __dr: string
}

export interface CometFooterRenderer2 {
  __typename: string
  attachment: Attachment14
  __module_operation_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment2
  __module_component_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment2
}

export interface Attachment14 {
  action_links?: ActionLink8[]
  headline_line_limit?: number
  source: any
  call_to_action_renderer?: CallToActionRenderer2
  story_attachment_link_renderer?: StoryAttachmentLinkRenderer2
  ghl_mocked_footer_info?: GhlMockedFooterInfo2
}

export interface ActionLink8 {
  __typename: string
  destination_type?: string
  link_title?: string
  link_description?: string
}

export interface CallToActionRenderer2 {
  __typename: string
  action_link: ActionLink9
  __module_operation_CometFeedStoryCallToAction_attachment: ModuleOperationCometFeedStoryCallToActionAttachment2
  __module_component_CometFeedStoryCallToAction_attachment: ModuleComponentCometFeedStoryCallToActionAttachment2
}

export interface ActionLink9 {
  __typename: string
  destination_type: string
  stateful_title: string
  title: string
  ghl_title: GhlTitle2
  url: string
  link_type: string
  fbclid: string
  post_id: string
  page: Page2
}

export interface GhlTitle2 {
  attributes: any[]
  styles: Style9[]
  text: any
  tag: string
  children: Children5[]
  __module_operation_CometFeedAttachmentLinkOpenCallToAction_actionLink: ModuleOperationCometFeedAttachmentLinkOpenCallToActionActionLink2
  __module_component_CometFeedAttachmentLinkOpenCallToAction_actionLink: ModuleComponentCometFeedAttachmentLinkOpenCallToActionActionLink2
}

export interface Style9 {
  name: string
  val: string
}

export interface Children5 {
  attributes: Attribute5[]
  styles: Style10[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute5 {
  name: string
  val: string
}

export interface Style10 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedAttachmentLinkOpenCallToActionActionLink2 {
  __dr: string
}

export interface ModuleComponentCometFeedAttachmentLinkOpenCallToActionActionLink2 {
  __dr: string
}

export interface Page2 {
  id: string
}

export interface ModuleOperationCometFeedStoryCallToActionAttachment2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryCallToActionAttachment2 {
  __dr: string
}

export interface StoryAttachmentLinkRenderer2 {
  __typename: string
  attachment: Attachment15
  __module_operation_CometFeedStoryLink_attachment: ModuleOperationCometFeedStoryLinkAttachment2
  __module_component_CometFeedStoryLink_attachment: ModuleComponentCometFeedStoryLinkAttachment2
}

export interface Attachment15 {
  web_link: WebLink2
  action_links: ActionLink10[]
  url: string
}

export interface WebLink2 {
  __typename: string
  url: string
  fbclid: any
  lynx_mode: string
}

export interface ActionLink10 {
  __typename: string
  url: string
}

export interface ModuleOperationCometFeedStoryLinkAttachment2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryLinkAttachment2 {
  __dr: string
}

export interface GhlMockedFooterInfo2 {
  headline: string
  footer_body: string
  link: string
  meta: string
  cta_button: CtaButton2
}

export interface CtaButton2 {
  attributes: any[]
  styles: Style11[]
  text: any
  tag: string
  children: Children6[]
}

export interface Style11 {
  name: string
  val: string
}

export interface Children6 {
  attributes: Attribute6[]
  styles: Style12[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute6 {
  name: string
  val: string
}

export interface Style12 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment2 {
  __dr: string
}

export interface Message8 {
  text: string
}

export interface ModuleOperationCometFeedStoryAttachedStoryStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachedStoryStory {
  __dr: string
}

export interface ModuleOperationCometFeedStoryAttachedStoryMatchRendererStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachedStoryMatchRendererStory {
  __dr: string
}

export interface Message9 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story19
  __module_operation_CometFeedStoryMessageMatchRenderer_story: ModuleOperationCometFeedStoryMessageMatchRendererStory3
  __module_component_CometFeedStoryMessageMatchRenderer_story: ModuleComponentCometFeedStoryMessageMatchRendererStory3
}

export interface Story19 {
  is_text_only_story?: boolean
  message: Message10
  message_truncation_line_limit: any
  sponsored_data: any
  attachments?: Attachment16[]
  id: string
  text_format_metadata?: TextFormatMetadata
  comet_sections?: CometSections14
  encrypted_tracking?: string
}

export interface Message10 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface Attachment16 {
  action_links: any[]
}

export interface TextFormatMetadata {
  is_image: boolean
  avatar_story_text_format_id: any
  fixed_aspect_ratio: any
  should_add_text_shadow_and_stroke: boolean
  is_text_always_vertical_centered: boolean
  background_color: string
  background_gradient_color: string
  background_gradient_direction: any
  background_image: any
  color: string
  font_weight: string
  font_style: string
  portrait_background_image: any
  text_align: string
  inspirations_custom_font_object: any
  background: Background
}

export interface Background {
  __typename: string
  image: any
  color: string
  gradient_color: string
  gradient_direction: any
  portrait_image: any
  __module_operation_CometFeedStoryFormattedBackgroundMessageRenderingStrategy_message: ModuleOperationCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage
  __module_component_CometFeedStoryFormattedBackgroundMessageRenderingStrategy_message: ModuleComponentCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage
}

export interface ModuleOperationCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage {
  __dr: string
}

export interface ModuleComponentCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage {
  __dr: string
}

export interface CometSections14 {
  attachment_overlay: any
}

export interface ModuleOperationCometFeedStoryMessageMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageMatchRendererStory3 {
  __dr: string
}

export interface MessageContainer3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story20
  __module_operation_CometFeedStoryMessageContainerMatchRenderer_story: ModuleOperationCometFeedStoryMessageContainerMatchRendererStory3
  __module_component_CometFeedStoryMessageContainerMatchRenderer_story: ModuleComponentCometFeedStoryMessageContainerMatchRendererStory3
}

export interface Story20 {
  message: Message11
  referenced_sticker: any
  attachments: Attachment17[]
  text_format_metadata?: TextFormatMetadata2
  comet_sections: CometSections15
  id: string
}

export interface Message11 {
  text: string
}

export interface Attachment17 {
  style_list: string[]
}

export interface TextFormatMetadata2 {
  preset_id: string
}

export interface CometSections15 {
  message: any
}

export interface ModuleOperationCometFeedStoryMessageContainerMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageContainerMatchRendererStory3 {
  __dr: string
}

export interface Attachment18 {
  deduplication_key: string
  target: Target2
  __typename: string
  style_list: string[]
  styles: Styles3
  throwbackStyles: any
  comet_footer_renderer: CometFooterRenderer3
  comet_footer_disclaimer_renderer: any
  media: Media9
  all_subattachments: AllSubattachments5
}

export interface Target2 {
  __typename: string
  id: string
}

export interface Styles3 {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment19
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment3
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment3
}

export interface Attachment19 {
  mediaset_token?: string
  url?: string
  all_subattachments?: AllSubattachments4
  comet_product_tag_feed_overlay_renderer: any
  media?: Media7
  style_list?: string[]
  style_infos?: StyleInfo[]
}

export interface AllSubattachments4 {
  count: number
  nodes: Node8[]
}

export interface Node8 {
  deduplication_key: string
  media: Media6
  url: string
}

export interface Media6 {
  __typename: string
  is_playable: boolean
  image: Image3
  viewer_image: ViewerImage3
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption?: string
  focus?: Focus3
  owner: Owner3
  __isNode: string
  video_cix_screen: any
  video_grid_renderer?: VideoGridRenderer
}

export interface Image3 {
  uri: string
  height: number
  width: number
}

export interface ViewerImage3 {
  height?: number
  width?: number
  uri: string
}

export interface Focus3 {
  x: number
  y: number
}

export interface Owner3 {
  __typename: string
  id: string
}

export interface VideoGridRenderer {
  __typename: string
  video: Video
  __module_operation_CometAlbumGridLayoutChild_video_videoRenderer: ModuleOperationCometAlbumGridLayoutChildVideoVideoRenderer
  __module_component_CometAlbumGridLayoutChild_video_videoRenderer: ModuleComponentCometAlbumGridLayoutChildVideoVideoRenderer
}

export interface Video {
  id: string
  animated_image_caption: any
  width: number
  height: number
  broadcaster_origin: any
  broadcast_id: any
  broadcast_status: any
  is_live_streaming: boolean
  is_live_trace_enabled: boolean
  is_looping: boolean
  is_video_broadcast: boolean
  is_podcast_video: boolean
  loop_count: number
  is_spherical: boolean
  is_spherical_enabled: boolean
  unsupported_browser_message: any
  pmv_metadata: any
  latency_sensitive_config: any
  live_playback_instrumentation_configs: any
  is_ncsr: boolean
  permalink_url: string
  captions_url: any
  seo_web_crawler_lookaside_url: any
  dash_prefetch_experimental: string[]
  video_available_captions_locales: any[]
  video_status_type: string
  can_use_oz: boolean
  min_quality_preference: any
  audio_user_preferred_language: string
  spherical_video_fallback_urls: any
  comet_video_player_nextgendash_availability: string
  videoDeliveryLegacyFields: any
  videoDeliveryResponseFragment: VideoDeliveryResponseFragment
  is_gaming_video: boolean
  is_latency_menu_enabled: boolean
  fbls_tier: any
  is_latency_sensitive_broadcast: boolean
  video_player_shaka_performance_logger_init: VideoPlayerShakaPerformanceLoggerInit
  video_player_shaka_performance_logger_should_sample: boolean
  video_player_shaka_performance_logger_init2: VideoPlayerShakaPerformanceLoggerInit2
  autoplay_gating_result: string
  viewer_autoplay_setting: string
  can_autoplay: boolean
  drm_info: string
  p2p_settings: any
  audio_settings: any
  captions_settings: any
  broadcast_low_latency_config: any
  audio_availability: string
  muted_segments: any[]
  spherical_video_renderer: any
  preferred_thumbnail: PreferredThumbnail
  video_imf_data: any
  is_clipping_enabled: boolean
  live_rewind_enabled: boolean
  owner: Owner4
  playable_duration_in_ms: number
  is_huddle: boolean
  url: string
  if_viewer_can_use_latency_menu: any
  if_viewer_can_use_latency_menu_toggle: any
  if_viewer_can_see_community_moderation_tools: any
  if_viewer_can_use_live_rewind: any
  if_viewer_can_use_clipping: any
  if_viewer_can_see_costreaming_tools: any
  video_player_scrubber_preview_renderer: VideoPlayerScrubberPreviewRenderer
  video_player_scrubber_base_content_renderer: any
  thumbnailImage: ThumbnailImage
  animatedThumbnail: any
  firstFrameThumbnail: string
  cix_screen: any
}

export interface VideoDeliveryResponseFragment {
  videoDeliveryResponseResult: VideoDeliveryResponseResult
  id: string
}

export interface VideoDeliveryResponseResult {
  dash_manifests: DashManifest[]
  dash_manifest_urls: DashManifestUrl[]
  progressive_urls: ProgressiveUrl[]
  hls_playlist_urls: HlsPlaylistUrl[]
}

export interface DashManifest {
  manifest_xml: string
  failure_reason: any
}

export interface DashManifestUrl {
  manifest_url: string
  failure_reason: any
}

export interface ProgressiveUrl {
  progressive_url: string
  failure_reason: any
  metadata: Metadata
}

export interface Metadata {
  quality: string
}

export interface HlsPlaylistUrl {
  hls_playlist_url: any
  failure_reason: FailureReason
}

export interface FailureReason {
  type: string
  message_format: string
  message_params: any[]
}

export interface VideoPlayerShakaPerformanceLoggerInit {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo
  __module_component_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo {
  __dr: string
}

export interface VideoPlayerShakaPerformanceLoggerInit2 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo
  __module_component_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo
  per_session_sampling_rate: any
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo {
  __dr: string
}

export interface PreferredThumbnail {
  image: Image4
  image_preview_payload: any
  id: string
}

export interface Image4 {
  uri: string
}

export interface Owner4 {
  __typename: string
  id: string
  __isVideoOwner: string
  has_professional_features_for_watch: boolean
}

export interface VideoPlayerScrubberPreviewRenderer {
  __typename: string
  video: Video2
  __module_operation_VideoPlayerScrubberPreview_video: ModuleOperationVideoPlayerScrubberPreviewVideo
  __module_component_VideoPlayerScrubberPreview_video: ModuleComponentVideoPlayerScrubberPreviewVideo
}

export interface Video2 {
  scrubber_preview_thumbnail_information: ScrubberPreviewThumbnailInformation
  id: string
}

export interface ScrubberPreviewThumbnailInformation {
  sprite_uris: string[]
  thumbnail_width: number
  thumbnail_height: number
  has_preview_thumbnails: boolean
  num_images_per_row: number
  max_number_of_images_per_sprite: number
  time_interval_between_image: number
}

export interface ModuleOperationVideoPlayerScrubberPreviewVideo {
  __dr: string
}

export interface ModuleComponentVideoPlayerScrubberPreviewVideo {
  __dr: string
}

export interface ThumbnailImage {
  uri: string
}

export interface ModuleOperationCometAlbumGridLayoutChildVideoVideoRenderer {
  __dr: string
}

export interface ModuleComponentCometAlbumGridLayoutChildVideoVideoRenderer {
  __dr: string
}

export interface Media7 {
  __typename: string
  __isMedia: string
  accent_color: string
  viewer_image: ViewerImage4
  photo_product_tags: any[]
  focus: Focus4
  comet_photo_attachment_resolution_renderer: CometPhotoAttachmentResolutionRenderer
  placeholder_image: PlaceholderImage
  accessibility_caption: string
  url: string
  id: string
  feedback: Feedback12
  __isNode: string
  comet_product_tag_feed_overlay_renderer: any
  comet_product_tag_dot_hint_renderer: any
  creation_story: CreationStory
}

export interface ViewerImage4 {
  height: number
  width: number
}

export interface Focus4 {
  x: number
  y: number
}

export interface CometPhotoAttachmentResolutionRenderer {
  __typename: string
  image: Image5
  __module_operation_CometFeedStoryPhotoAttachment_attachment__comet_photo_attachment_resolution_renderer: ModuleOperationCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer
  __module_component_CometFeedStoryPhotoAttachment_attachment__comet_photo_attachment_resolution_renderer: ModuleComponentCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer
}

export interface Image5 {
  uri: string
  height: number
  width: number
}

export interface ModuleOperationCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer {
  __dr: string
}

export interface ModuleComponentCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer {
  __dr: string
}

export interface PlaceholderImage {
  uri: string
}

export interface Feedback12 {
  can_viewer_comment: boolean
  id: string
}

export interface CreationStory {
  target_group: TargetGroup
  id: string
}

export interface TargetGroup {
  id: string
}

export interface StyleInfo {
  __typename: string
  fb_shorts_story?: FbShortsStory
  enable_horizontal_ufi?: boolean
  enable_comet_reels_unification_for_ifr?: boolean
}

export interface FbShortsStory {
  encrypted_tracking: string
  encrypted_click_tracking: string
  click_tracking_linkshim_cb: string
  attachments: Attachment20[]
  tracking: string
  privacy_scope: PrivacyScope3
  id: string
  post_id: string
  sponsored_data: any
  creation_time: number
  feedback: Feedback13
  branded_content_post_info: any
  creator_collaboration: any
  short_form_video_context: ShortFormVideoContext
  is_reshare: boolean
  actors: Actor6[]
  can_viewer_delete: boolean
  can_viewer_cancel_collaboration_invite: boolean
  can_viewer_remove_collaborator: boolean
  can_viewer_see_collaboration_invite: boolean
  legal_reporting_cta_type: any
  legal_reporting_uri: any
  save_info: SaveInfo
  to: To
  video: Video4
  post_collaboration: any
  can_viewer_remove_self_as_collaborator: boolean
  if_viewer_can_see_stars_toggle_menu_option: any
  transparency_ad_info: TransparencyAdInfo
  serialized_frtp_identifiers: any
  debug_info: any
  inform_treatment_for_community_notes: any
  message: Message12
  translated_message_for_viewer: any
}

export interface Attachment20 {
  media: Media8
  call_to_action_renderer: any
}

export interface Media8 {
  __typename: string
  height: number
  width: number
  length_in_second: number
  id: string
  thumbnailImage: ThumbnailImage2
  animated_image_caption: any
  broadcaster_origin: any
  broadcast_id: any
  broadcast_status: any
  is_live_streaming: boolean
  is_live_trace_enabled: boolean
  is_looping: boolean
  is_video_broadcast: boolean
  is_podcast_video: boolean
  loop_count: number
  is_spherical: boolean
  is_spherical_enabled: boolean
  unsupported_browser_message: any
  pmv_metadata: any
  latency_sensitive_config: any
  live_playback_instrumentation_configs: any
  is_ncsr: boolean
  permalink_url: string
  captions_url: any
  seo_web_crawler_lookaside_url: any
  dash_prefetch_experimental: string[]
  video_available_captions_locales: any[]
  video_status_type: string
  can_use_oz: boolean
  min_quality_preference: any
  audio_user_preferred_language: string
  spherical_video_fallback_urls: any
  comet_video_player_nextgendash_availability: string
  videoDeliveryLegacyFields: any
  videoDeliveryResponseFragment: VideoDeliveryResponseFragment2
  is_gaming_video: boolean
  is_latency_menu_enabled: boolean
  fbls_tier: any
  is_latency_sensitive_broadcast: boolean
  video_player_shaka_performance_logger_init: VideoPlayerShakaPerformanceLoggerInit3
  video_player_shaka_performance_logger_should_sample: boolean
  video_player_shaka_performance_logger_init2: VideoPlayerShakaPerformanceLoggerInit22
  autoplay_gating_result: string
  viewer_autoplay_setting: string
  can_autoplay: boolean
  drm_info: string
  p2p_settings: any
  audio_settings: any
  captions_settings: any
  broadcast_low_latency_config: any
  audio_availability: string
  muted_segments: any[]
  spherical_video_renderer: any
  preferred_thumbnail: PreferredThumbnail2
  video_imf_data: any
  warning_screen_renderer: any
  cix_screen: any
  playable_duration_in_ms: number
  owner: Owner5
  __isNode: string
  is_reel: boolean
  remix_info: RemixInfo
  embeddable: boolean
  shareable_url: string
  video_owner_type: string
  soundtrack_info: any
  track_title: any
  music_album_art_uri: string
  is_original_audio_on_facebook: boolean
  video_label: any
  first_frame_thumbnail: string
}

export interface ThumbnailImage2 {
  uri: string
}

export interface VideoDeliveryResponseFragment2 {
  videoDeliveryResponseResult: VideoDeliveryResponseResult2
  id: string
}

export interface VideoDeliveryResponseResult2 {
  dash_manifests: DashManifest2[]
  dash_manifest_urls: DashManifestUrl2[]
  progressive_urls: ProgressiveUrl2[]
  hls_playlist_urls: HlsPlaylistUrl2[]
}

export interface DashManifest2 {
  manifest_xml: string
  failure_reason: any
}

export interface DashManifestUrl2 {
  manifest_url: string
  failure_reason: any
}

export interface ProgressiveUrl2 {
  progressive_url: string
  failure_reason: any
  metadata: Metadata2
}

export interface Metadata2 {
  quality: string
}

export interface HlsPlaylistUrl2 {
  hls_playlist_url: any
  failure_reason: FailureReason2
}

export interface FailureReason2 {
  type: string
  message_format: string
  message_params: any[]
}

export interface VideoPlayerShakaPerformanceLoggerInit3 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo2
  __module_component_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo2
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo2 {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo2 {
  __dr: string
}

export interface VideoPlayerShakaPerformanceLoggerInit22 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo2
  __module_component_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo2
  per_session_sampling_rate: any
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo2 {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo2 {
  __dr: string
}

export interface PreferredThumbnail2 {
  image: Image6
  image_preview_payload: any
  id: string
}

export interface Image6 {
  uri: string
}

export interface Owner5 {
  __typename: string
  id: string
  __isActor: string
  name: string
  enable_reels_tab_deeplink: boolean
  is_verified: boolean
  url: string
  displayPicture: DisplayPicture
  subscribe_status: string
  delegate_page: any
}

export interface DisplayPicture {
  uri: string
}

export interface RemixInfo {
  is_remixable: boolean
  status: string
}

export interface PrivacyScope3 {
  description: string
  label: string
  display_label: string
  icon_image: IconImage3
  privacy_scope_renderer: any
}

export interface IconImage3 {
  height: number
  scale: number
  uri: string
  width: number
}

export interface Feedback13 {
  associated_group: AssociatedGroup2
  id: string
}

export interface AssociatedGroup2 {
  id: string
  if_viewer_can_see_reel_group_attribution: IfViewerCanSeeReelGroupAttribution
  if_viewer_can_see_group_reels_music_pill: any
}

export interface IfViewerCanSeeReelGroupAttribution {
  __typename: string
  id: string
  if_viewer_can_see_reel_group_attribution: IfViewerCanSeeReelGroupAttribution2
  profilePicture36: ProfilePicture36
}

export interface IfViewerCanSeeReelGroupAttribution2 {
  id: string
  name: string
}

export interface ProfilePicture36 {
  uri: string
}

export interface ShortFormVideoContext {
  video: Video3
}

export interface Video3 {
  id: string
}

export interface Actor6 {
  __typename: string
  __isActor: string
  id: string
  name: string
  enable_reels_tab_deeplink: boolean
  is_verified: boolean
  url: string
}

export interface SaveInfo {
  viewer_save_state: string
}

export interface To {
  __typename: string
  id: string
}

export interface Video4 {
  id: string
  owner: Owner6
}

export interface Owner6 {
  __typename: string
  id: string
}

export interface TransparencyAdInfo {
  menu_label: string
  should_display_ad_info: boolean
}

export interface Message12 {
  text: string
  ranges: any[]
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment3 {
  __dr: string
}

export interface CometFooterRenderer3 {
  __typename: string
  attachment: Attachment21
  __module_operation_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment3
  __module_component_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment3
}

export interface Attachment21 {
  ghl_mocked_footer_info: GhlMockedFooterInfo3
}

export interface GhlMockedFooterInfo3 {
  headline: string
  footer_body: string
  link: string
  meta: string
  cta_button: CtaButton3
}

export interface CtaButton3 {
  attributes: any[]
  styles: Style13[]
  text: any
  tag: string
  children: Children7[]
}

export interface Style13 {
  name: string
  val: string
}

export interface Children7 {
  attributes: Attribute7[]
  styles: Style14[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute7 {
  name: string
  val: string
}

export interface Style14 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment3 {
  __dr: string
}

export interface Media9 {
  __typename: string
  __isNode: string
  id: string
  allow_unencrypted_playback?: boolean
}

export interface AllSubattachments5 {
  nodes: Node9[]
}

export interface Node9 {
  media: Media10
}

export interface Media10 {
  __typename: string
  __isNode: string
  id: string
  allow_unencrypted_playback?: boolean
}

export interface FutureOfFeedInfo4 {
  dominant_readable_color?: string
}

export interface TextFormatMetadata3 {
  __typename: string
}

export interface Actor7 {
  __typename: string
  id: string
  name: string
  __isEntity: string
  url?: string
}

export interface Message13 {
  __typename: string
  text: string
}

export interface TargetGroup2 {
  id: string
}

export interface AttachedStory4 {
  comet_sections: CometSections16
  encrypted_tracking: string
  attachments: Attachment24[]
  future_of_feed_info: FutureOfFeedInfo5
  daspo_sto: any
  text_format_metadata: any
  post_id: string
  actors: Actor8[]
  message: Message17
  ghl_mocked_encrypted_link: string
  ghl_label_mocked_cta_button: any
  wwwURL: string
  target_group: any
  id: string
}

export interface CometSections16 {
  above_message: any
  info_icon: any
  attachment_overlay: any
  attached_story: any
  message: Message14
  message_suffix: any
  message_container: MessageContainer4
  message_sticker: any
}

export interface Message14 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story21
  __module_operation_CometFeedStoryMessageMatchRenderer_story: ModuleOperationCometFeedStoryMessageMatchRendererStory4
  __module_component_CometFeedStoryMessageMatchRenderer_story: ModuleComponentCometFeedStoryMessageMatchRendererStory4
}

export interface Story21 {
  is_text_only_story: boolean
  message: Message15
  message_truncation_line_limit: number
  sponsored_data: any
  attachments: Attachment22[]
  id: string
}

export interface Message15 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface Attachment22 {
  action_links: ActionLink11[]
}

export interface ActionLink11 {
  __typename: string
  url: string
}

export interface ModuleOperationCometFeedStoryMessageMatchRendererStory4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageMatchRendererStory4 {
  __dr: string
}

export interface MessageContainer4 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story22
  __module_operation_CometFeedStoryMessageContainerMatchRenderer_story: ModuleOperationCometFeedStoryMessageContainerMatchRendererStory4
  __module_component_CometFeedStoryMessageContainerMatchRenderer_story: ModuleComponentCometFeedStoryMessageContainerMatchRendererStory4
}

export interface Story22 {
  message: Message16
  referenced_sticker: any
  attachments: Attachment23[]
  text_format_metadata: any
  comet_sections: CometSections17
  id: string
}

export interface Message16 {
  text: string
}

export interface Attachment23 {
  style_list: string[]
}

export interface CometSections17 {
  message: any
}

export interface ModuleOperationCometFeedStoryMessageContainerMatchRendererStory4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageContainerMatchRendererStory4 {
  __dr: string
}

export interface Attachment24 {
  deduplication_key: string
  target: Target3
  __typename: string
  style_list: string[]
  styles: Styles4
  throwbackStyles: any
  comet_footer_renderer: CometFooterRenderer4
  comet_footer_disclaimer_renderer: any
  media: Media12
  all_subattachments: AllSubattachments7
}

export interface Target3 {
  __typename: string
  id: string
}

export interface Styles4 {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment25
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment4
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment4
}

export interface Attachment25 {
  mediaset_token: string
  url: string
  all_subattachments: AllSubattachments6
  comet_product_tag_feed_overlay_renderer: any
}

export interface AllSubattachments6 {
  count: number
  nodes: Node10[]
}

export interface Node10 {
  deduplication_key: string
  media: Media11
  url: string
}

export interface Media11 {
  __typename: string
  is_playable: boolean
  image: Image7
  viewer_image: ViewerImage5
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption: string
  focus: Focus5
  owner: Owner7
  __isNode: string
}

export interface Image7 {
  uri: string
  height: number
  width: number
}

export interface ViewerImage5 {
  height: number
  width: number
  uri: string
}

export interface Focus5 {
  x: number
  y: number
}

export interface Owner7 {
  __typename: string
  id: string
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment4 {
  __dr: string
}

export interface CometFooterRenderer4 {
  __typename: string
  attachment: Attachment26
  __module_operation_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment4
  __module_component_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment4
}

export interface Attachment26 {
  action_links?: ActionLink12[]
  headline_line_limit?: number
  source: any
  call_to_action_renderer?: CallToActionRenderer3
  story_attachment_link_renderer?: StoryAttachmentLinkRenderer3
  ghl_mocked_footer_info?: GhlMockedFooterInfo4
}

export interface ActionLink12 {
  __typename: string
  destination_type?: string
  link_title?: string
  link_description?: string
}

export interface CallToActionRenderer3 {
  __typename: string
  action_link: ActionLink13
  __module_operation_CometFeedStoryCallToAction_attachment: ModuleOperationCometFeedStoryCallToActionAttachment3
  __module_component_CometFeedStoryCallToAction_attachment: ModuleComponentCometFeedStoryCallToActionAttachment3
}

export interface ActionLink13 {
  __typename: string
  destination_type: string
  stateful_title: string
  title: string
  ghl_title: GhlTitle3
  url: string
  link_type: string
  fbclid: string
  post_id: string
  page: Page3
}

export interface GhlTitle3 {
  attributes: any[]
  styles: Style15[]
  text: any
  tag: string
  children: Children8[]
  __module_operation_CometFeedAttachmentLinkOpenCallToAction_actionLink: ModuleOperationCometFeedAttachmentLinkOpenCallToActionActionLink3
  __module_component_CometFeedAttachmentLinkOpenCallToAction_actionLink: ModuleComponentCometFeedAttachmentLinkOpenCallToActionActionLink3
}

export interface Style15 {
  name: string
  val: string
}

export interface Children8 {
  attributes: Attribute8[]
  styles: Style16[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute8 {
  name: string
  val: string
}

export interface Style16 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedAttachmentLinkOpenCallToActionActionLink3 {
  __dr: string
}

export interface ModuleComponentCometFeedAttachmentLinkOpenCallToActionActionLink3 {
  __dr: string
}

export interface Page3 {
  id: string
}

export interface ModuleOperationCometFeedStoryCallToActionAttachment3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryCallToActionAttachment3 {
  __dr: string
}

export interface StoryAttachmentLinkRenderer3 {
  __typename: string
  attachment: Attachment27
  __module_operation_CometFeedStoryLink_attachment: ModuleOperationCometFeedStoryLinkAttachment3
  __module_component_CometFeedStoryLink_attachment: ModuleComponentCometFeedStoryLinkAttachment3
}

export interface Attachment27 {
  web_link: WebLink3
  action_links: ActionLink14[]
  url: string
}

export interface WebLink3 {
  __typename: string
  url: string
  fbclid: any
  lynx_mode: string
}

export interface ActionLink14 {
  __typename: string
  url: string
}

export interface ModuleOperationCometFeedStoryLinkAttachment3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryLinkAttachment3 {
  __dr: string
}

export interface GhlMockedFooterInfo4 {
  headline: string
  footer_body: string
  link: string
  meta: string
  cta_button: CtaButton4
}

export interface CtaButton4 {
  attributes: any[]
  styles: Style17[]
  text: any
  tag: string
  children: Children9[]
}

export interface Style17 {
  name: string
  val: string
}

export interface Children9 {
  attributes: Attribute9[]
  styles: Style18[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute9 {
  name: string
  val: string
}

export interface Style18 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment4 {
  __dr: string
}

export interface Media12 {
  __typename: string
  __isNode: string
  id: string
}

export interface AllSubattachments7 {
  nodes: Node11[]
}

export interface Node11 {
  media: Media13
}

export interface Media13 {
  __typename: string
  __isNode: string
  id: string
}

export interface FutureOfFeedInfo5 {
  dominant_readable_color?: string
}

export interface Actor8 {
  __typename: string
  id: string
  name: string
  __isEntity: string
  url: string
}

export interface Message17 {
  __typename: string
  text: string
}

export interface ModuleOperationCometFeedStoryContentMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryContentMatchRendererStory2 {
  __dr: string
}

export interface Layout2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  __module_operation_CometFeedStoryLayoutMatchRenderer_story: ModuleOperationCometFeedStoryLayoutMatchRendererStory2
  __module_component_CometFeedStoryLayoutMatchRenderer_story: ModuleComponentCometFeedStoryLayoutMatchRendererStory2
  is_feedback_hidden?: boolean
}

export interface ModuleOperationCometFeedStoryLayoutMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryLayoutMatchRendererStory2 {
  __dr: string
}

export interface ContextLayout2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  local_alerts_story_menu_promotion: any
  story: Story23
  is_regulation_enforced: boolean
  __module_operation_CometFeedStoryContextSectionMatchRenderer_story: ModuleOperationCometFeedStoryContextSectionMatchRendererStory2
  __module_component_CometFeedStoryContextSectionMatchRenderer_story: ModuleComponentCometFeedStoryContextSectionMatchRendererStory2
}

export interface Story23 {
  id: string
  debug_info: any
  serialized_frtp_identifiers: any
  can_viewer_see_menu: boolean
  comet_sections: CometSections18
  encrypted_tracking: string
  easy_hide_button_story: any
}

export interface CometSections18 {
  actor_photo: ActorPhoto3
  metadata: Metadaum3[]
  title: Title4
}

export interface ActorPhoto3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story24
  has_commerce_attachment: boolean
  __module_operation_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory3
  __module_component_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory3
}

export interface Story24 {
  actors: Actor9[]
  comet_sections: CometSections19
  attachments: Attachment28[]
  daspo_sto: any
  id: string
}

export interface Actor9 {
  __typename: string
  __isActor: string
  id: string
  __isEntity: string
  url?: string
  work_foreign_entity_info: any
  work_info: any
  story_bucket?: StoryBucket3
  live_video_for_comet_live_ring: any
  profile_url?: string
  name: string
  profile_picture: ProfilePicture4
  is_additional_profile_plus?: boolean
  delegate_page: any
}

export interface StoryBucket3 {
  nodes: Node12[]
}

export interface Node12 {
  should_show_close_friend_badge: boolean
  id: string
  first_story_to_show: any
}

export interface ProfilePicture4 {
  uri: string
  width: number
  height: number
  scale: number
}

export interface CometSections19 {
  action_link: ActionLink15
}

export interface ActionLink15 {
  __typename: string
  has_member_profile?: boolean
  group: Group
  actor?: Actor10
  __module_operation_CometFeedStoryActorLink_story: ModuleOperationCometFeedStoryActorLinkStory
  __module_component_CometFeedStoryActorLink_story: ModuleComponentCometFeedStoryActorLinkStory
  story?: Story25
  owner: any
  profile?: Profile
}

export interface Group {
  id: string
  __typename?: string
}

export interface Actor10 {
  __typename: string
  id: string
  __isEntity: string
  url: string
}

export interface ModuleOperationCometFeedStoryActorLinkStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorLinkStory {
  __dr: string
}

export interface Story25 {
  id: string
}

export interface Profile {
  id: string
}

export interface Attachment28 {
  action_links: any[]
}

export interface ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory3 {
  __dr: string
}

export interface Metadaum3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  override_url: any
  video_override_url: any
  story: Story26
  __module_operation_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory3
  __module_component_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory3
}

export interface Story26 {
  creation_time?: number
  url?: string
  ghl_label?: GhlLabel3
  id: string
  privacy_scope?: PrivacyScope4
  user_signals_info?: UserSignalsInfo
}

export interface GhlLabel3 {
  attributes: any[]
  styles: Style19[]
  text: any
  tag: string
  children: Children10[]
}

export interface Style19 {
  name: string
  val: string
}

export interface Children10 {
  attributes: Attribute10[]
  styles: Style20[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute10 {
  name: string
  val: string
}

export interface Style20 {
  name: string
  val: string
}

export interface PrivacyScope4 {
  icon_image: IconImage4
  description: string
}

export interface IconImage4 {
  name: string
}

export interface UserSignalsInfo {
  displayed_user_signals: DisplayedUserSignal[]
  has_more: boolean
  overflow_uri: any
  total_count: number
  show_middot: boolean
}

export interface DisplayedUserSignal {
  id: string
  signal_type_id: string
  lightModeImage: LightModeImage
  darkModeImage: DarkModeImage
  tag_render_info: TagRenderInfo
  title: Title3
}

export interface LightModeImage {
  uri: string
}

export interface DarkModeImage {
  uri: string
}

export interface TagRenderInfo {
  comet_detail_view: any
  color_variant: string
  layout_type: string
}

export interface Title3 {
  text: string
}

export interface ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory3 {
  __dr: string
}

export interface Title4 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story27
  __module_operation_CometFeedStoryTitleSectionMatchRenderer_story: ModuleOperationCometFeedStoryTitleSectionMatchRendererStory3
  __module_component_CometFeedStoryTitleSectionMatchRenderer_story: ModuleComponentCometFeedStoryTitleSectionMatchRendererStory3
}

export interface Story27 {
  id: string
  actors: Actor11[]
  collaborators: any[]
  title?: Title5
  comet_sections: CometSections20
  encrypted_tracking: string
}

export interface Actor11 {
  __typename: string
  name: string
  id: string
  __isActor: string
  __isEntity: string
  url?: string
  work_foreign_entity_info: any
  work_info: any
}

export interface Title5 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: Range4[]
  color_ranges: any[]
  text: string
}

export interface Range4 {
  entity: Entity4
  entity_is_weak_reference: boolean
  length: number
  offset: number
}

export interface Entity4 {
  __typename: string
  __isEntity: string
  __isActor: string
  id: string
  url: string
  profile_url: string
  short_name: string
  work_info: any
  __module_operation_CometTextWithEntitiesRelay_textWithEntities: ModuleOperationCometTextWithEntitiesRelayTextWithEntities3
  __module_component_CometTextWithEntitiesRelay_textWithEntities: ModuleComponentCometTextWithEntitiesRelayTextWithEntities3
  work_foreign_entity_info: any
  is_verified: boolean
  mobileUrl: string
  __isNode: string
}

export interface ModuleOperationCometTextWithEntitiesRelayTextWithEntities3 {
  __dr: string
}

export interface ModuleComponentCometTextWithEntitiesRelayTextWithEntities3 {
  __dr: string
}

export interface CometSections20 {
  action_link: ActionLink16
  follow_button: any
  badge: any
}

export interface ActionLink16 {
  __typename: string
  has_member_profile?: boolean
  group: Group2
  actor?: Actor12
  __module_operation_CometFeedStoryActorLink_story: ModuleOperationCometFeedStoryActorLinkStory2
  __module_component_CometFeedStoryActorLink_story: ModuleComponentCometFeedStoryActorLinkStory2
  story?: Story28
  owner: any
  profile?: Profile2
}

export interface Group2 {
  id: string
  __typename?: string
}

export interface Actor12 {
  __typename: string
  id: string
  __isEntity: string
  url: string
}

export interface ModuleOperationCometFeedStoryActorLinkStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorLinkStory2 {
  __dr: string
}

export interface Story28 {
  id: string
}

export interface Profile2 {
  id: string
}

export interface ModuleOperationCometFeedStoryTitleSectionMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryTitleSectionMatchRendererStory3 {
  __dr: string
}

export interface ModuleOperationCometFeedStoryContextSectionMatchRendererStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryContextSectionMatchRendererStory2 {
  __dr: string
}

export interface Feedback14 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story29
  __module_operation_CometFeedStoryFeedbackSection_story: ModuleOperationCometFeedStoryFeedbackSectionStory2
  __module_component_CometFeedStoryFeedbackSection_story: ModuleComponentCometFeedStoryFeedbackSectionStory2
}

export interface Story29 {
  feedback_context: FeedbackContext3
  story_ufi_container: StoryUfiContainer2
  id: string
}

export interface FeedbackContext3 {
  feedback_target_with_context: FeedbackTargetWithContext3
}

export interface FeedbackTargetWithContext3 {
  viewer_actor: ViewerActor10
  id: string
}

export interface ViewerActor10 {
  __typename: string
  id: string
}

export interface StoryUfiContainer2 {
  __typename: string
  story: Story30
  __module_operation_CometFeedUFIContainer_story: ModuleOperationCometFeedUficontainerStory2
  __module_component_CometFeedUFIContainer_story: ModuleComponentCometFeedUficontainerStory2
}

export interface Story30 {
  encrypted_tracking: string
  is_text_only_story: boolean
  feedback_context: FeedbackContext4
  shareable_from_perspective_of_feed_ufi: any
  id: string
  url: string
  post_id: string
  tracking: string
  daspo_sto: any
  inform_treatment_for_messaging: any
  target_group: TargetGroup3
  click_tracking_linkshim_cb: string
  encrypted_click_tracking: string
  __module_operation_useCometUFIAdaptivePostActionBar_story: ModuleOperationUseCometUfiadaptivePostActionBarStory2
  __module_component_useCometUFIAdaptivePostActionBar_story: ModuleComponentUseCometUfiadaptivePostActionBarStory2
  vote_attachments: any[]
  feed_backend_data: FeedBackendData2
}

export interface FeedbackContext4 {
  feedback_target_with_context: FeedbackTargetWithContext4
  interesting_top_level_comments: InterestingTopLevelComment2[]
}

export interface FeedbackTargetWithContext4 {
  id: string
  owning_profile: OwningProfile3
  can_viewer_comment: boolean
  comment_rendering_instance: CommentRenderingInstance4
  comet_ufi_summary_and_actions_renderer: CometUfiSummaryAndActionsRenderer2
  is_community_qa_or_qaish_post: boolean
  threading_config?: ThreadingConfig2
  actor_provider: ActorProvider3
  viewer_actor: ViewerActor14
  url: string
  __typename: string
  if_viewer_can_comment_anonymously: any
  plugins: Plugin3[]
  comment_composer_placeholder: string
  have_comments_been_disabled: boolean
  default_comment_ordering_mode: string
  inline_composer_visible_by_default: boolean
  associated_group: AssociatedGroup3
  work_comment_summaries_from_feedback: any
  are_live_video_comments_disabled: boolean
  is_viewer_muted: boolean
  comments_disabled_notice_renderer: CommentsDisabledNoticeRenderer2
  comment_moderation_filter_restriction_notice: any
}

export interface OwningProfile3 {
  __typename: string
  name: string
  short_name?: string
  id: string
}

export interface CommentRenderingInstance4 {
  comments: Comments4
}

export interface Comments4 {
  total_count: number
}

export interface CometUfiSummaryAndActionsRenderer2 {
  __typename: string
  feedback: Feedback15
  __module_operation_CometUFISummaryAndActions_feedback: ModuleOperationCometUfisummaryAndActionsFeedback2
  __module_component_CometUFISummaryAndActions_feedback: ModuleComponentCometUfisummaryAndActionsFeedback2
}

export interface Feedback15 {
  id: string
  subscription_target_id: string
  i18n_reaction_count: string
  important_reactors: ImportantReactors2
  reaction_count: ReactionCount3
  top_reactions: TopReactions4
  reaction_display_config: ReactionDisplayConfig3
  viewer_actor: ViewerActor11
  viewer_feedback_reaction_info: any
  can_show_seen_by: boolean
  if_viewer_can_see_seen_by_member_list: any
  if_viewer_cannot_see_seen_by_member_list: IfViewerCannotSeeSeenByMemberList2
  i18n_share_count: string
  share_count: ShareCount2
  comments_count_summary_renderer: CommentsCountSummaryRenderer2
  associated_video?: AssociatedVideo
  comment_rendering_instance: CommentRenderingInstance6
  page_private_reply: any
  video_view_count?: number
  video_view_count_renderer: any
  is_similar_cqa_question: boolean
  message_action: MessageAction
  ufi_action_renderers: UfiActionRenderer2[]
  should_show_reshare_warning: boolean
  adaptive_ufi_action_renderers: AdaptiveUfiActionRenderer2[]
}

export interface ImportantReactors2 {
  nodes: any[]
}

export interface ReactionCount3 {
  count: number
  is_empty: boolean
}

export interface TopReactions4 {
  count: number
  edges: Edge2[]
}

export interface Edge2 {
  visible_in_bling_bar: boolean
  node: Node13
  i18n_reaction_count: string
  reaction_count: number
}

export interface Node13 {
  id: string
  localized_name: string
}

export interface ReactionDisplayConfig3 {
  reaction_display_strategy: string
  reaction_string_with_viewer: any
  reaction_string_without_viewer: any
  __module_operation_CometUFIReactionsCount_feedback: ModuleOperationCometUfireactionsCountFeedback2
  __module_component_CometUFIReactionsCount_feedback: ModuleComponentCometUfireactionsCountFeedback2
}

export interface ModuleOperationCometUfireactionsCountFeedback2 {
  __dr: string
}

export interface ModuleComponentCometUfireactionsCountFeedback2 {
  __dr: string
}

export interface ViewerActor11 {
  __typename: string
  id: string
  name: string
}

export interface IfViewerCannotSeeSeenByMemberList2 {
  i18n_reaction_count: string
  reaction_count: ReactionCount4
  reaction_display_config: ReactionDisplayConfig4
  seen_by: SeenBy2
  __module_operation_CometUFISeenByCount_feedback__if_viewer_cannot_see_seen_by_member_list: ModuleOperationCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList2
  __module_component_CometUFISeenByCount_feedback__if_viewer_cannot_see_seen_by_member_list: ModuleComponentCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList2
  id: string
}

export interface ReactionCount4 {
  count: number
}

export interface ReactionDisplayConfig4 {
  reaction_display_strategy: string
}

export interface SeenBy2 {
  count: number
  i18n_seen_by_count: any
  seen_by_everyone: boolean
}

export interface ModuleOperationCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList2 {
  __dr: string
}

export interface ModuleComponentCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList2 {
  __dr: string
}

export interface ShareCount2 {
  count: number
  is_empty: boolean
}

export interface CommentsCountSummaryRenderer2 {
  __typename: string
  feedback: Feedback16
  __module_operation_CometUFISummaryBase_feedback: ModuleOperationCometUfisummaryBaseFeedback2
  __module_component_CometUFISummaryBase_feedback: ModuleComponentCometUfisummaryBaseFeedback2
}

export interface Feedback16 {
  id: string
  comment_rendering_instance: CommentRenderingInstance5
}

export interface CommentRenderingInstance5 {
  comments: Comments5
}

export interface Comments5 {
  total_count: number
}

export interface ModuleOperationCometUfisummaryBaseFeedback2 {
  __dr: string
}

export interface ModuleComponentCometUfisummaryBaseFeedback2 {
  __dr: string
}

export interface AssociatedVideo {
  broadcast_is_ama_enabled: boolean
  id: string
}

export interface CommentRenderingInstance6 {
  comments: Comments6
}

export interface Comments6 {
  total_count: number
}

export interface MessageAction {
  __typename: string
  __module_operation_useCometUFIPostActionBar_feedback_message_action: ModuleOperationUseCometUfipostActionBarFeedbackMessageAction
  __module_component_useCometUFIPostActionBar_feedback_message_action: ModuleComponentUseCometUfipostActionBarFeedbackMessageAction
}

export interface ModuleOperationUseCometUfipostActionBarFeedbackMessageAction {
  __dr: string
}

export interface ModuleComponentUseCometUfipostActionBarFeedbackMessageAction {
  __dr: string
}

export interface UfiActionRenderer2 {
  __typename: string
  feedback?: Feedback17
  hideLabelForAMA?: boolean
  __module_operation_useCometUFIPostActionBar_feedback__ufi_action_renderers: ModuleOperationUseCometUfipostActionBarFeedbackUfiActionRenderers2
  __module_component_useCometUFIPostActionBar_feedback__ufi_action_renderers: ModuleComponentUseCometUfipostActionBarFeedbackUfiActionRenderers2
}

export interface Feedback17 {
  viewer_feedback_reaction_info: any
  supported_reaction_infos: SupportedReactionInfo4[]
  comet_ufi_reaction_icon_renderer: CometUfiReactionIconRenderer4
  id: string
  viewer_actor: ViewerActor12
}

export interface SupportedReactionInfo4 {
  animation: Animation4
  id: string
}

export interface Animation4 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer4 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback4
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback4
}

export interface ModuleOperationCometUfireactionStrategyFeedback4 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback4 {
  __dr: string
}

export interface ViewerActor12 {
  __typename: string
  id: string
}

export interface ModuleOperationUseCometUfipostActionBarFeedbackUfiActionRenderers2 {
  __dr: string
}

export interface ModuleComponentUseCometUfipostActionBarFeedbackUfiActionRenderers2 {
  __dr: string
}

export interface AdaptiveUfiActionRenderer2 {
  __typename: string
  feedback?: Feedback18
  hideLabelForAMA?: boolean
  __module_operation_useCometUFIAdaptivePostActionBar_feedback: ModuleOperationUseCometUfiadaptivePostActionBarFeedback2
  __module_component_useCometUFIAdaptivePostActionBar_feedback: ModuleComponentUseCometUfiadaptivePostActionBarFeedback2
}

export interface Feedback18 {
  viewer_feedback_reaction_info: any
  supported_reaction_infos: SupportedReactionInfo5[]
  comet_ufi_reaction_icon_renderer: CometUfiReactionIconRenderer5
  id: string
  viewer_actor: ViewerActor13
}

export interface SupportedReactionInfo5 {
  animation: Animation5
  id: string
}

export interface Animation5 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer5 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback5
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback5
}

export interface ModuleOperationCometUfireactionStrategyFeedback5 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback5 {
  __dr: string
}

export interface ViewerActor13 {
  __typename: string
  id: string
}

export interface ModuleOperationUseCometUfiadaptivePostActionBarFeedback2 {
  __dr: string
}

export interface ModuleComponentUseCometUfiadaptivePostActionBarFeedback2 {
  __dr: string
}

export interface ModuleOperationCometUfisummaryAndActionsFeedback2 {
  __dr: string
}

export interface ModuleComponentCometUfisummaryAndActionsFeedback2 {
  __dr: string
}

export interface ThreadingConfig2 {
  __typename: string
}

export interface ActorProvider3 {
  __typename: string
  current_actor: CurrentActor3
  id: string
}

export interface CurrentActor3 {
  __typename: string
  id: string
  __isActor: string
  name: string
  profile_picture_depth_0: ProfilePictureDepth04
  profile_picture_depth_1: ProfilePictureDepth14
  gender: string
}

export interface ProfilePictureDepth04 {
  uri: string
}

export interface ProfilePictureDepth14 {
  uri: string
}

export interface ViewerActor14 {
  __typename: string
  id: string
}

export interface Plugin3 {
  __typename: string
  group_id?: string
  post_id?: string
  __module_operation_useCometUFIComposerPlugins_feedback: ModuleOperationUseCometUficomposerPluginsFeedback3
  __module_component_useCometUFIComposerPlugins_feedback: ModuleComponentUseCometUficomposerPluginsFeedback3
  has_avatar?: boolean
  feedback_id?: string
  avatar_style_version: any
  emoji_size?: number
  viewer_actor?: ViewerActor15
  should_condense_video_preview?: boolean
  owning_profile_id?: string
}

export interface ModuleOperationUseCometUficomposerPluginsFeedback3 {
  __dr: string
}

export interface ModuleComponentUseCometUficomposerPluginsFeedback3 {
  __dr: string
}

export interface ViewerActor15 {
  __typename: string
  id: string
}

export interface AssociatedGroup3 {
  id: string
}

export interface CommentsDisabledNoticeRenderer2 {
  __typename: string
  notice_message: NoticeMessage2
  __module_operation_CometUFICommentDisabledNotice_feedback: ModuleOperationCometUficommentDisabledNoticeFeedback2
  __module_component_CometUFICommentDisabledNotice_feedback: ModuleComponentCometUficommentDisabledNoticeFeedback2
}

export interface NoticeMessage2 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface ModuleOperationCometUficommentDisabledNoticeFeedback2 {
  __dr: string
}

export interface ModuleComponentCometUficommentDisabledNoticeFeedback2 {
  __dr: string
}

export interface InterestingTopLevelComment2 {
  comment: Comment3
  relevant_contextual_replies: RelevantContextualReplies2
}

export interface Comment3 {
  id: string
  legacy_fbid: string
  depth: number
  body: Body2
  attachments: any[]
  is_markdown_enabled: boolean
  community_comment_signal_renderer: any
  comment_menu_tooltip: string
  should_show_comment_menu: boolean
  author: Author4
  is_author_weak_reference: boolean
  comment_action_links: CommentActionLink2[]
  feedback: Feedback20
  preferred_body: PreferredBody2
  body_renderer: BodyRenderer2
  comment_parent: any
  is_declined_by_group_admin_assistant: boolean
  is_gaming_video_comment: boolean
  timestamp_in_video?: number
  translatability_for_viewer: TranslatabilityForViewer2
  written_while_video_was_live: boolean
  group_comment_info: GroupCommentInfo
  bizweb_comment_info: any
  has_constituent_badge: boolean
  can_viewer_see_subsribe_button: boolean
  can_see_constituent_badge_upsell: boolean
  legacy_token: string
  parent_feedback: ParentFeedback2
  question_and_answer_type: any
  author_user_signals_renderer?: AuthorUserSignalsRenderer
  author_badge_renderers: any[]
  identity_badges_web: any[]
  can_show_multiple_identity_badges: boolean
  discoverable_identity_badges_web: any[]
  user: User2
  is_viewer_comment_poster: boolean
  parent_post_story: ParentPostStory2
  work_ama_answer_status: any
  work_knowledge_inline_annotation_comment_badge_renderer: any
  business_comment_attributes: any[]
  is_live_video_comment: boolean
  created_time: number
  translation_available_for_viewer: boolean
  inline_survey_config: any
  spam_display_mode: string
  attached_story: any
  comment_direct_parent: any
  if_viewer_can_see_member_page_tooltip: any
  is_disabled: boolean
  work_answered_event_comment_renderer: any
  comment_upper_badge_renderer: any
  elevated_comment_data: any
  inline_replies_expander_renderer: any
}

export interface Body2 {
  text: string
  ranges: any[]
}

export interface Author4 {
  __typename: string
  id: string
  name: string
  __isActor: string
  profile_picture_depth_0: ProfilePictureDepth05
  profile_picture_depth_1: ProfilePictureDepth15
  gender: string
  __isEntity: string
  url: string
  work_info: any
  is_verified: boolean
  short_name: string
  subscribe_status: string
}

export interface ProfilePictureDepth05 {
  uri: string
}

export interface ProfilePictureDepth15 {
  uri: string
}

export interface CommentActionLink2 {
  __typename: string
  comment: Comment4
  __module_operation_CometUFICommentActionLinks_comment: ModuleOperationCometUficommentActionLinksComment2
  __module_component_CometUFICommentActionLinks_comment: ModuleComponentCometUficommentActionLinksComment2
}

export interface Comment4 {
  id: string
  created_time?: number
  url?: string
  is_live_video_comment?: boolean
  feedback?: Feedback19
  comment_parent: any
  is_author_weak_reference?: boolean
  legacy_fbid?: string
  author?: Author5
}

export interface Feedback19 {
  comment_composer_placeholder?: string
  id: string
  viewer_feedback_reaction_info: any
  viewer_actor?: ViewerActor16
  supported_reaction_infos?: SupportedReactionInfo6[]
  comet_ufi_reaction_icon_renderer?: CometUfiReactionIconRenderer6
  associated_video: any
  top_reactions?: TopReactions5
  unified_reactors?: UnifiedReactors2
  reactors?: Reactors3
}

export interface ViewerActor16 {
  __typename: string
  id: string
}

export interface SupportedReactionInfo6 {
  animation: Animation6
  id: string
}

export interface Animation6 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer6 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback6
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback6
}

export interface ModuleOperationCometUfireactionStrategyFeedback6 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback6 {
  __dr: string
}

export interface TopReactions5 {
  edges: Edge3[]
}

export interface Edge3 {
  reaction_count: number
  node: Node14
}

export interface Node14 {
  id: string
}

export interface UnifiedReactors2 {
  count: number
}

export interface Reactors3 {
  count: number
  is_empty: boolean
}

export interface Author5 {
  __typename: string
  id: string
  name: string
  url: string
}

export interface ModuleOperationCometUficommentActionLinksComment2 {
  __dr: string
}

export interface ModuleComponentCometUficommentActionLinksComment2 {
  __dr: string
}

export interface Feedback20 {
  viewer_feedback_reaction_info: any
  id: string
  top_reactions: TopReactions6
  reactors: Reactors4
  total_reply_count: number
  viewer_actor: ViewerActor17
  actor_provider: ActorProvider4
  url: string
  __typename: string
  if_viewer_can_comment_anonymously: any
  plugins: Plugin4[]
  comment_composer_placeholder: string
  can_viewer_comment: boolean
  have_comments_been_disabled: boolean
  default_comment_ordering_mode: string
  inline_composer_visible_by_default: boolean
  comment_rendering_instance: any
  associated_group: AssociatedGroup4
}

export interface TopReactions6 {
  edges: Edge4[]
}

export interface Edge4 {
  visible_in_bling_bar: boolean
  node: Node15
  reaction_count: number
}

export interface Node15 {
  id: string
}

export interface Reactors4 {
  count_reduced: string
}

export interface ViewerActor17 {
  __typename: string
  id: string
}

export interface ActorProvider4 {
  __typename: string
  current_actor: CurrentActor4
  id: string
}

export interface CurrentActor4 {
  __typename: string
  id: string
  __isActor: string
  name: string
  profile_picture_depth_0: ProfilePictureDepth06
  profile_picture_depth_1: ProfilePictureDepth16
  gender: string
}

export interface ProfilePictureDepth06 {
  uri: string
}

export interface ProfilePictureDepth16 {
  uri: string
}

export interface Plugin4 {
  __typename: string
  group_id?: string
  post_id?: string
  __module_operation_useCometUFIComposerPlugins_feedback: ModuleOperationUseCometUficomposerPluginsFeedback4
  __module_component_useCometUFIComposerPlugins_feedback: ModuleComponentUseCometUficomposerPluginsFeedback4
  has_avatar?: boolean
  feedback_id?: string
  avatar_style_version: any
  emoji_size?: number
  viewer_actor?: ViewerActor18
  should_condense_video_preview?: boolean
  owning_profile_id?: string
}

export interface ModuleOperationUseCometUficomposerPluginsFeedback4 {
  __dr: string
}

export interface ModuleComponentUseCometUficomposerPluginsFeedback4 {
  __dr: string
}

export interface ViewerActor18 {
  __typename: string
  id: string
}

export interface AssociatedGroup4 {
  id: string
}

export interface PreferredBody2 {
  __typename: string
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
  translation_type: string
}

export interface BodyRenderer2 {
  __typename: string
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
  __module_operation_CometUFICommentTextBodyRenderer_comment: ModuleOperationCometUficommentTextBodyRendererComment2
  __module_component_CometUFICommentTextBodyRenderer_comment: ModuleComponentCometUficommentTextBodyRendererComment2
}

export interface ModuleOperationCometUficommentTextBodyRendererComment2 {
  __dr: string
}

export interface ModuleComponentCometUficommentTextBodyRendererComment2 {
  __dr: string
}

export interface TranslatabilityForViewer2 {
  source_dialect: string
}

export interface GroupCommentInfo {
  group: Group3
  is_author_anonymous: boolean
  is_author_with_member_profile: boolean
  __module_operation_CometUFICommentActorLink_comment_groups: ModuleOperationCometUficommentActorLinkCommentGroups
  __module_component_CometUFICommentActorLink_comment_groups: ModuleComponentCometUficommentActorLinkCommentGroups
}

export interface Group3 {
  id: string
  __typename: string
}

export interface ModuleOperationCometUficommentActorLinkCommentGroups {
  __dr: string
}

export interface ModuleComponentCometUficommentActorLinkCommentGroups {
  __dr: string
}

export interface ParentFeedback2 {
  id: string
  share_fbid: string
  political_figure_data: any
  owning_profile: OwningProfile4
}

export interface OwningProfile4 {
  __typename: string
  name: string
  id: string
}

export interface AuthorUserSignalsRenderer {
  __typename: string
  user_signals_info: UserSignalsInfo2
  __module_operation_CometUFICommentActorLinkBadges_comment: ModuleOperationCometUficommentActorLinkBadgesComment
  __module_component_CometUFICommentActorLinkBadges_comment: ModuleComponentCometUficommentActorLinkBadgesComment
}

export interface UserSignalsInfo2 {
  displayed_user_signals: DisplayedUserSignal2[]
  has_more: boolean
  overflow_uri: any
  total_count: number
  show_middot: any
}

export interface DisplayedUserSignal2 {
  id: string
  signal_type_id: string
  lightModeImage: any
  darkModeImage: any
  tag_render_info: TagRenderInfo2
  title: Title6
}

export interface TagRenderInfo2 {
  comet_detail_view: any
  color_variant: string
  layout_type: string
}

export interface Title6 {
  text: string
}

export interface ModuleOperationCometUficommentActorLinkBadgesComment {
  __dr: string
}

export interface ModuleComponentCometUficommentActorLinkBadgesComment {
  __dr: string
}

export interface User2 {
  name: string
  profile_picture: ProfilePicture5
  id: string
}

export interface ProfilePicture5 {
  uri: string
}

export interface ParentPostStory2 {
  attachments: Attachment29[]
  id: string
}

export interface Attachment29 {
  media: Media14
}

export interface Media14 {
  __typename: string
  __isNode: string
  id: string
  is_live_streaming?: boolean
  broadcast_duration: any
  playable_duration?: number
  owner?: Owner8
}

export interface Owner8 {
  __typename: string
  __isVideoOwner: string
  actor_to_follow: ActorToFollow
  name: string
  id: string
}

export interface ActorToFollow {
  __typename: string
  id: string
  video_channel_is_viewer_following: boolean
}

export interface RelevantContextualReplies2 {
  nodes: any[]
}

export interface TargetGroup3 {
  id: string
  visibility: string
  privacy_info: PrivacyInfo
}

export interface PrivacyInfo {
  icon_name: string
  description: Description
}

export interface Description {
  text: string
}

export interface ModuleOperationUseCometUfiadaptivePostActionBarStory2 {
  __dr: string
}

export interface ModuleComponentUseCometUfiadaptivePostActionBarStory2 {
  __dr: string
}

export interface FeedBackendData2 {
  pcomment: number
}

export interface ModuleOperationCometFeedUficontainerStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedUficontainerStory2 {
  __dr: string
}

export interface ModuleOperationCometFeedStoryFeedbackSectionStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryFeedbackSectionStory2 {
  __dr: string
}

export interface CallToAction2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story31
  __module_operation_CometFeedStoryCallToActionSection_story: ModuleOperationCometFeedStoryCallToActionSectionStory2
  __module_component_CometFeedStoryCallToActionSection_story: ModuleComponentCometFeedStoryCallToActionSectionStory2
}

export interface Story31 {
  bumpers: any
  tracking: string
  id: string
}

export interface ModuleOperationCometFeedStoryCallToActionSectionStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryCallToActionSectionStory2 {
  __dr: string
}

export interface ActionLink17 {
  __typename: string
  has_member_profile?: boolean
  group: Group4
  actor?: Actor13
  __module_operation_CometFeedStoryActorLink_story: ModuleOperationCometFeedStoryActorLinkStory3
  __module_component_CometFeedStoryActorLink_story: ModuleComponentCometFeedStoryActorLinkStory3
  story?: Story32
  owner: any
  profile?: Profile3
}

export interface Group4 {
  id: string
  __typename?: string
}

export interface Actor13 {
  __typename: string
  id: string
  __isEntity: string
  url: string
}

export interface ModuleOperationCometFeedStoryActorLinkStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorLinkStory3 {
  __dr: string
}

export interface Story32 {
  id: string
}

export interface Profile3 {
  id: string
}

export interface Timestamp {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  override_url: any
  video_override_url: any
  story: Story33
  __module_operation_CometFeedStoryTimestampSection_story: ModuleOperationCometFeedStoryTimestampSectionStory
  __module_component_CometFeedStoryTimestampSection_story: ModuleComponentCometFeedStoryTimestampSectionStory
}

export interface Story33 {
  creation_time: number
  url: string
  ghl_label: GhlLabel4
  id: string
}

export interface GhlLabel4 {
  attributes: any[]
  styles: Style21[]
  text: any
  tag: string
  children: Children11[]
}

export interface Style21 {
  name: string
  val: string
}

export interface Children11 {
  attributes: Attribute11[]
  styles: Style22[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute11 {
  name: string
  val: string
}

export interface Style22 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedStoryTimestampSectionStory {
  __dr: string
}

export interface ModuleComponentCometFeedStoryTimestampSectionStory {
  __dr: string
}

export interface Actor14 {
  __typename: string
  name: string
  id: string
  __isActor: string
  __isEntity: string
  url?: string
  work_foreign_entity_info: any
  work_info: any
}

export interface To2 {
  __typename: string
  __isActor: string
  id: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  is_multi_company_group: boolean
  work_official_status: string
  name: string
}

export interface Attachment30 {
  styles: Styles5
}

export interface Styles5 {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment31
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment5
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment5
}

export interface Attachment31 {
  mediaset_token?: string
  url?: string
  all_subattachments?: AllSubattachments8
  comet_product_tag_feed_overlay_renderer: any
  media?: Media16
  style_list?: string[]
  style_infos?: StyleInfo2[]
}

export interface AllSubattachments8 {
  count: number
  nodes: Node16[]
}

export interface Node16 {
  deduplication_key: string
  media: Media15
  url: string
}

export interface Media15 {
  __typename: string
  is_playable: boolean
  image: Image8
  viewer_image: ViewerImage6
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption?: string
  focus?: Focus6
  owner: Owner9
  __isNode: string
  video_cix_screen: any
  video_grid_renderer?: VideoGridRenderer2
}

export interface Image8 {
  uri: string
  height: number
  width: number
}

export interface ViewerImage6 {
  height?: number
  width?: number
  uri: string
}

export interface Focus6 {
  x: number
  y: number
}

export interface Owner9 {
  __typename: string
  id: string
}

export interface VideoGridRenderer2 {
  __typename: string
  video: Video5
  __module_operation_CometAlbumGridLayoutChild_video_videoRenderer: ModuleOperationCometAlbumGridLayoutChildVideoVideoRenderer2
  __module_component_CometAlbumGridLayoutChild_video_videoRenderer: ModuleComponentCometAlbumGridLayoutChildVideoVideoRenderer2
}

export interface Video5 {
  id: string
  animated_image_caption: any
  width: number
  height: number
  broadcaster_origin: any
  broadcast_id: any
  broadcast_status: any
  is_live_streaming: boolean
  is_live_trace_enabled: boolean
  is_looping: boolean
  is_video_broadcast: boolean
  is_podcast_video: boolean
  loop_count: number
  is_spherical: boolean
  is_spherical_enabled: boolean
  unsupported_browser_message: any
  pmv_metadata: any
  latency_sensitive_config: any
  live_playback_instrumentation_configs: any
  is_ncsr: boolean
  permalink_url: string
  captions_url: any
  seo_web_crawler_lookaside_url: any
  dash_prefetch_experimental: string[]
  video_available_captions_locales: any[]
  video_status_type: string
  can_use_oz: boolean
  min_quality_preference: any
  audio_user_preferred_language: string
  spherical_video_fallback_urls: any
  comet_video_player_nextgendash_availability: string
  videoDeliveryLegacyFields: any
  videoDeliveryResponseFragment: VideoDeliveryResponseFragment3
  is_gaming_video: boolean
  is_latency_menu_enabled: boolean
  fbls_tier: any
  is_latency_sensitive_broadcast: boolean
  video_player_shaka_performance_logger_init: VideoPlayerShakaPerformanceLoggerInit4
  video_player_shaka_performance_logger_should_sample: boolean
  video_player_shaka_performance_logger_init2: VideoPlayerShakaPerformanceLoggerInit23
  autoplay_gating_result: string
  viewer_autoplay_setting: string
  can_autoplay: boolean
  drm_info: string
  p2p_settings: any
  audio_settings: any
  captions_settings: any
  broadcast_low_latency_config: any
  audio_availability: string
  muted_segments: any[]
  spherical_video_renderer: any
  preferred_thumbnail: PreferredThumbnail3
  video_imf_data: any
  is_clipping_enabled: boolean
  live_rewind_enabled: boolean
  owner: Owner10
  playable_duration_in_ms: number
  is_huddle: boolean
  url: string
  if_viewer_can_use_latency_menu: any
  if_viewer_can_use_latency_menu_toggle: any
  if_viewer_can_see_community_moderation_tools: any
  if_viewer_can_use_live_rewind: any
  if_viewer_can_use_clipping: any
  if_viewer_can_see_costreaming_tools: any
  video_player_scrubber_preview_renderer: VideoPlayerScrubberPreviewRenderer2
  video_player_scrubber_base_content_renderer: any
  thumbnailImage: ThumbnailImage3
  animatedThumbnail: any
  firstFrameThumbnail: string
  cix_screen: any
}

export interface VideoDeliveryResponseFragment3 {
  videoDeliveryResponseResult: VideoDeliveryResponseResult3
  id: string
}

export interface VideoDeliveryResponseResult3 {
  dash_manifests: DashManifest3[]
  dash_manifest_urls: DashManifestUrl3[]
  progressive_urls: ProgressiveUrl3[]
  hls_playlist_urls: HlsPlaylistUrl3[]
}

export interface DashManifest3 {
  manifest_xml: string
  failure_reason: any
}

export interface DashManifestUrl3 {
  manifest_url: string
  failure_reason: any
}

export interface ProgressiveUrl3 {
  progressive_url: string
  failure_reason: any
  metadata: Metadata3
}

export interface Metadata3 {
  quality: string
}

export interface HlsPlaylistUrl3 {
  hls_playlist_url: any
  failure_reason: FailureReason3
}

export interface FailureReason3 {
  type: string
  message_format: string
  message_params: any[]
}

export interface VideoPlayerShakaPerformanceLoggerInit4 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo3
  __module_component_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo3
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo3 {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo3 {
  __dr: string
}

export interface VideoPlayerShakaPerformanceLoggerInit23 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo3
  __module_component_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo3
  per_session_sampling_rate: any
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo3 {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo3 {
  __dr: string
}

export interface PreferredThumbnail3 {
  image: Image9
  image_preview_payload: any
  id: string
}

export interface Image9 {
  uri: string
}

export interface Owner10 {
  __typename: string
  id: string
  __isVideoOwner: string
  has_professional_features_for_watch: boolean
}

export interface VideoPlayerScrubberPreviewRenderer2 {
  __typename: string
  video: Video6
  __module_operation_VideoPlayerScrubberPreview_video: ModuleOperationVideoPlayerScrubberPreviewVideo2
  __module_component_VideoPlayerScrubberPreview_video: ModuleComponentVideoPlayerScrubberPreviewVideo2
}

export interface Video6 {
  scrubber_preview_thumbnail_information: ScrubberPreviewThumbnailInformation2
  id: string
}

export interface ScrubberPreviewThumbnailInformation2 {
  sprite_uris: string[]
  thumbnail_width: number
  thumbnail_height: number
  has_preview_thumbnails: boolean
  num_images_per_row: number
  max_number_of_images_per_sprite: number
  time_interval_between_image: number
}

export interface ModuleOperationVideoPlayerScrubberPreviewVideo2 {
  __dr: string
}

export interface ModuleComponentVideoPlayerScrubberPreviewVideo2 {
  __dr: string
}

export interface ThumbnailImage3 {
  uri: string
}

export interface ModuleOperationCometAlbumGridLayoutChildVideoVideoRenderer2 {
  __dr: string
}

export interface ModuleComponentCometAlbumGridLayoutChildVideoVideoRenderer2 {
  __dr: string
}

export interface Media16 {
  __typename: string
  __isMedia: string
  accent_color: string
  viewer_image: ViewerImage7
  photo_product_tags: any[]
  focus: Focus7
  comet_photo_attachment_resolution_renderer: CometPhotoAttachmentResolutionRenderer2
  placeholder_image: PlaceholderImage2
  accessibility_caption: string
  url: string
  id: string
  feedback: Feedback21
  __isNode: string
  comet_product_tag_feed_overlay_renderer: any
  comet_product_tag_dot_hint_renderer: any
  creation_story: CreationStory2
}

export interface ViewerImage7 {
  height: number
  width: number
}

export interface Focus7 {
  x: number
  y: number
}

export interface CometPhotoAttachmentResolutionRenderer2 {
  __typename: string
  image: Image10
  __module_operation_CometFeedStoryPhotoAttachment_attachment__comet_photo_attachment_resolution_renderer: ModuleOperationCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer2
  __module_component_CometFeedStoryPhotoAttachment_attachment__comet_photo_attachment_resolution_renderer: ModuleComponentCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer2
}

export interface Image10 {
  uri: string
  height: number
  width: number
}

export interface ModuleOperationCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryPhotoAttachmentAttachmentCometPhotoAttachmentResolutionRenderer2 {
  __dr: string
}

export interface PlaceholderImage2 {
  uri: string
}

export interface Feedback21 {
  can_viewer_comment: boolean
  id: string
}

export interface CreationStory2 {
  target_group: TargetGroup4
  id: string
}

export interface TargetGroup4 {
  id: string
}

export interface StyleInfo2 {
  __typename: string
  fb_shorts_story?: FbShortsStory2
  enable_horizontal_ufi?: boolean
  enable_comet_reels_unification_for_ifr?: boolean
}

export interface FbShortsStory2 {
  encrypted_tracking: string
  encrypted_click_tracking: string
  click_tracking_linkshim_cb: string
  attachments: Attachment32[]
  tracking: string
  privacy_scope: PrivacyScope5
  id: string
  post_id: string
  sponsored_data: any
  creation_time: number
  feedback: Feedback22
  branded_content_post_info: any
  creator_collaboration: any
  short_form_video_context: ShortFormVideoContext2
  is_reshare: boolean
  actors: Actor15[]
  can_viewer_delete: boolean
  can_viewer_cancel_collaboration_invite: boolean
  can_viewer_remove_collaborator: boolean
  can_viewer_see_collaboration_invite: boolean
  legal_reporting_cta_type: any
  legal_reporting_uri: any
  save_info: SaveInfo2
  to: To3
  video: Video8
  post_collaboration: any
  can_viewer_remove_self_as_collaborator: boolean
  if_viewer_can_see_stars_toggle_menu_option: any
  transparency_ad_info: TransparencyAdInfo2
  serialized_frtp_identifiers: any
  debug_info: any
  inform_treatment_for_community_notes: any
  message: Message18
  translated_message_for_viewer: any
}

export interface Attachment32 {
  media: Media17
  call_to_action_renderer: any
}

export interface Media17 {
  __typename: string
  height: number
  width: number
  length_in_second: number
  id: string
  thumbnailImage: ThumbnailImage4
  animated_image_caption: any
  broadcaster_origin: any
  broadcast_id: any
  broadcast_status: any
  is_live_streaming: boolean
  is_live_trace_enabled: boolean
  is_looping: boolean
  is_video_broadcast: boolean
  is_podcast_video: boolean
  loop_count: number
  is_spherical: boolean
  is_spherical_enabled: boolean
  unsupported_browser_message: any
  pmv_metadata: any
  latency_sensitive_config: any
  live_playback_instrumentation_configs: any
  is_ncsr: boolean
  permalink_url: string
  captions_url: any
  seo_web_crawler_lookaside_url: any
  dash_prefetch_experimental: string[]
  video_available_captions_locales: any[]
  video_status_type: string
  can_use_oz: boolean
  min_quality_preference: any
  audio_user_preferred_language: string
  spherical_video_fallback_urls: any
  comet_video_player_nextgendash_availability: string
  videoDeliveryLegacyFields: any
  videoDeliveryResponseFragment: VideoDeliveryResponseFragment4
  is_gaming_video: boolean
  is_latency_menu_enabled: boolean
  fbls_tier: any
  is_latency_sensitive_broadcast: boolean
  video_player_shaka_performance_logger_init: VideoPlayerShakaPerformanceLoggerInit5
  video_player_shaka_performance_logger_should_sample: boolean
  video_player_shaka_performance_logger_init2: VideoPlayerShakaPerformanceLoggerInit24
  autoplay_gating_result: string
  viewer_autoplay_setting: string
  can_autoplay: boolean
  drm_info: string
  p2p_settings: any
  audio_settings: any
  captions_settings: any
  broadcast_low_latency_config: any
  audio_availability: string
  muted_segments: any[]
  spherical_video_renderer: any
  preferred_thumbnail: PreferredThumbnail4
  video_imf_data: any
  warning_screen_renderer: any
  cix_screen: any
  playable_duration_in_ms: number
  owner: Owner11
  __isNode: string
  is_reel: boolean
  remix_info: RemixInfo2
  embeddable: boolean
  shareable_url: string
  video_owner_type: string
  soundtrack_info: any
  track_title: any
  music_album_art_uri: string
  is_original_audio_on_facebook: boolean
  video_label: any
  first_frame_thumbnail: string
}

export interface ThumbnailImage4 {
  uri: string
}

export interface VideoDeliveryResponseFragment4 {
  videoDeliveryResponseResult: VideoDeliveryResponseResult4
  id: string
}

export interface VideoDeliveryResponseResult4 {
  dash_manifests: DashManifest4[]
  dash_manifest_urls: DashManifestUrl4[]
  progressive_urls: ProgressiveUrl4[]
  hls_playlist_urls: HlsPlaylistUrl4[]
}

export interface DashManifest4 {
  manifest_xml: string
  failure_reason: any
}

export interface DashManifestUrl4 {
  manifest_url: string
  failure_reason: any
}

export interface ProgressiveUrl4 {
  progressive_url: string
  failure_reason: any
  metadata: Metadata4
}

export interface Metadata4 {
  quality: string
}

export interface HlsPlaylistUrl4 {
  hls_playlist_url: any
  failure_reason: FailureReason4
}

export interface FailureReason4 {
  type: string
  message_format: string
  message_params: any[]
}

export interface VideoPlayerShakaPerformanceLoggerInit5 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo4
  __module_component_useVideoPlayerShakaPerformanceLoggerRelayImpl_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo4
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerRelayImplVideo4 {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerRelayImplVideo4 {
  __dr: string
}

export interface VideoPlayerShakaPerformanceLoggerInit24 {
  __typename: string
  __module_operation_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo4
  __module_component_useVideoPlayerShakaPerformanceLoggerBuilder_video: ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo4
  per_session_sampling_rate: any
}

export interface ModuleOperationUseVideoPlayerShakaPerformanceLoggerBuilderVideo4 {
  __dr: string
}

export interface ModuleComponentUseVideoPlayerShakaPerformanceLoggerBuilderVideo4 {
  __dr: string
}

export interface PreferredThumbnail4 {
  image: Image11
  image_preview_payload: any
  id: string
}

export interface Image11 {
  uri: string
}

export interface Owner11 {
  __typename: string
  id: string
  __isActor: string
  name: string
  enable_reels_tab_deeplink: boolean
  is_verified: boolean
  url: string
  displayPicture: DisplayPicture2
  subscribe_status: string
  delegate_page: any
}

export interface DisplayPicture2 {
  uri: string
}

export interface RemixInfo2 {
  is_remixable: boolean
  status: string
}

export interface PrivacyScope5 {
  description: string
  label: string
  display_label: string
  icon_image: IconImage5
  privacy_scope_renderer: any
}

export interface IconImage5 {
  height: number
  scale: number
  uri: string
  width: number
}

export interface Feedback22 {
  associated_group: AssociatedGroup5
  id: string
}

export interface AssociatedGroup5 {
  id: string
  if_viewer_can_see_reel_group_attribution: IfViewerCanSeeReelGroupAttribution3
  if_viewer_can_see_group_reels_music_pill: any
}

export interface IfViewerCanSeeReelGroupAttribution3 {
  __typename: string
  id: string
  if_viewer_can_see_reel_group_attribution: IfViewerCanSeeReelGroupAttribution4
  profilePicture36: ProfilePicture362
}

export interface IfViewerCanSeeReelGroupAttribution4 {
  id: string
  name: string
}

export interface ProfilePicture362 {
  uri: string
}

export interface ShortFormVideoContext2 {
  video: Video7
}

export interface Video7 {
  id: string
}

export interface Actor15 {
  __typename: string
  __isActor: string
  id: string
  name: string
  enable_reels_tab_deeplink: boolean
  is_verified: boolean
  url: string
}

export interface SaveInfo2 {
  viewer_save_state: string
}

export interface To3 {
  __typename: string
  id: string
}

export interface Video8 {
  id: string
  owner: Owner12
}

export interface Owner12 {
  __typename: string
  id: string
}

export interface TransparencyAdInfo2 {
  menu_label: string
  should_display_ad_info: boolean
}

export interface Message18 {
  text: string
  ranges: any[]
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment5 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment5 {
  __dr: string
}

export interface ModuleOperationCometFeedUnitContainerSectionFeedUnit {
  __dr: string
}

export interface ModuleComponentCometFeedUnitContainerSectionFeedUnit {
  __dr: string
}

export interface Trackingdata {
  id: string
}

export interface ClientViewConfig {
  can_delay_log_impression: boolean
  use_banzai_signal_imp: boolean
  use_banzai_vital_imp: boolean
}

export interface GroupFeed {
  edges: Edge5[]
}

export interface Edge5 {
  node: Node17
  cursor: string
}

export interface Node17 {
  __typename: string
  __isFeedUnit: string
  __isCacheable: string
  cache_id: string
  debug_info: any
  id: string
  daspo_sto: any
  feedback: Feedback23
  is_story_civic: any
  matched_terms: any[]
  post_id: string
  cix_screen: any
  future_of_feed_info: FutureOfFeedInfo6
  attached_story: any
  bumpers: any
  comet_sections: CometSections21
  encrypted_tracking: string
  should_host_actor_link_in_watch: boolean
  whatsapp_ad_context: any
  schema_context: any
  click_tracking_linkshim_cb: string
  encrypted_click_tracking: string
  actors: Actor22[]
  to: To4
  work_is_repost: any
  attachments: Attachment40[]
  __module_operation_CometFeedUnitContainerSection_feedUnit: ModuleOperationCometFeedUnitContainerSectionFeedUnit2
  __module_component_CometFeedUnitContainerSection_feedUnit: ModuleComponentCometFeedUnitContainerSectionFeedUnit2
  __isTrackableFeedUnit: string
  trackingdata: Trackingdata2
  viewability_config: number[]
  client_view_config: ClientViewConfig2
  __isNode: string
}

export interface Feedback23 {
  associated_group: AssociatedGroup6
  id: string
}

export interface AssociatedGroup6 {
  context_actor_hovercard: string
  id: string
}

export interface FutureOfFeedInfo6 {
  should_reverse_message_and_attachment_position: boolean
  should_overlay_header: boolean
  aspect_ratio_update: number
  web_reshare_variant: string
}

export interface CometSections21 {
  __typename: string
  content: Content3
  layout: Layout3
  copyright_violation_header: any
  header: any
  context_layout: ContextLayout3
  aymt_footer: any
  footer: any
  feedback: Feedback25
  outer_footer: any
  call_to_action: CallToAction3
  post_inform_treatment: any
  action_link: ActionLink20
  timestamp: Timestamp2
}

export interface Content3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story34
  __module_operation_CometFeedStoryContentMatchRenderer_story: ModuleOperationCometFeedStoryContentMatchRendererStory3
  __module_component_CometFeedStoryContentMatchRenderer_story: ModuleComponentCometFeedStoryContentMatchRendererStory3
}

export interface Story34 {
  feedback: Feedback24
  comet_sections: CometSections22
  encrypted_tracking: string
  attachments: Attachment35[]
  future_of_feed_info: FutureOfFeedInfo7
  daspo_sto: any
  text_format_metadata?: TextFormatMetadata6
  post_id: string
  actors: Actor16[]
  message: Message22
  ghl_mocked_encrypted_link: string
  ghl_label_mocked_cta_button: any
  wwwURL: string
  target_group: TargetGroup5
  attached_story: any
  id: string
}

export interface Feedback24 {
  id: string
}

export interface CometSections22 {
  above_message: any
  info_icon: any
  attachment_overlay: any
  attached_story: any
  message: Message19
  message_suffix: any
  message_container: MessageContainer5
  message_sticker: any
  aggregated_stories: any
}

export interface Message19 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story35
  __module_operation_CometFeedStoryMessageMatchRenderer_story: ModuleOperationCometFeedStoryMessageMatchRendererStory5
  __module_component_CometFeedStoryMessageMatchRenderer_story: ModuleComponentCometFeedStoryMessageMatchRendererStory5
}

export interface Story35 {
  is_text_only_story?: boolean
  message: Message20
  message_truncation_line_limit?: number
  sponsored_data: any
  attachments?: Attachment33[]
  id: string
  text_format_metadata?: TextFormatMetadata4
  comet_sections?: CometSections23
  encrypted_tracking?: string
}

export interface Message20 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: Range5[]
  color_ranges: any[]
  text: string
}

export interface Range5 {
  entity: Entity5
  entity_is_weak_reference: boolean
  length: number
  offset: number
}

export interface Entity5 {
  __typename: string
  __isEntity: string
  __isActor: string
  id: string
  url: string
  profile_url: string
  short_name: string
  work_info: any
  __module_operation_CometTextWithEntitiesRelay_textWithEntities: ModuleOperationCometTextWithEntitiesRelayTextWithEntities4
  __module_component_CometTextWithEntitiesRelay_textWithEntities: ModuleComponentCometTextWithEntitiesRelayTextWithEntities4
  work_foreign_entity_info: any
  is_verified: boolean
  mobileUrl: string
  __isNode: string
}

export interface ModuleOperationCometTextWithEntitiesRelayTextWithEntities4 {
  __dr: string
}

export interface ModuleComponentCometTextWithEntitiesRelayTextWithEntities4 {
  __dr: string
}

export interface Attachment33 {
  action_links: any[]
}

export interface TextFormatMetadata4 {
  is_image: boolean
  avatar_story_text_format_id: any
  fixed_aspect_ratio: any
  should_add_text_shadow_and_stroke: boolean
  is_text_always_vertical_centered: boolean
  background_color: string
  background_gradient_color: string
  background_gradient_direction?: string
  background_image: any
  color: string
  font_weight: string
  font_style: string
  portrait_background_image: any
  text_align: string
  inspirations_custom_font_object: any
  background: Background2
}

export interface Background2 {
  __typename: string
  image: any
  color: string
  gradient_color: string
  gradient_direction?: string
  portrait_image: any
  __module_operation_CometFeedStoryFormattedBackgroundMessageRenderingStrategy_message: ModuleOperationCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage2
  __module_component_CometFeedStoryFormattedBackgroundMessageRenderingStrategy_message: ModuleComponentCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage2
}

export interface ModuleOperationCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryFormattedBackgroundMessageRenderingStrategyMessage2 {
  __dr: string
}

export interface CometSections23 {
  attachment_overlay: any
}

export interface ModuleOperationCometFeedStoryMessageMatchRendererStory5 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageMatchRendererStory5 {
  __dr: string
}

export interface MessageContainer5 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story36
  __module_operation_CometFeedStoryMessageContainerMatchRenderer_story: ModuleOperationCometFeedStoryMessageContainerMatchRendererStory5
  __module_component_CometFeedStoryMessageContainerMatchRenderer_story: ModuleComponentCometFeedStoryMessageContainerMatchRendererStory5
}

export interface Story36 {
  message: Message21
  referenced_sticker: any
  attachments: Attachment34[]
  text_format_metadata?: TextFormatMetadata5
  comet_sections: CometSections24
  id: string
}

export interface Message21 {
  text: string
}

export interface Attachment34 {
  style_list: string[]
}

export interface TextFormatMetadata5 {
  preset_id: string
}

export interface CometSections24 {
  message: any
}

export interface ModuleOperationCometFeedStoryMessageContainerMatchRendererStory5 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMessageContainerMatchRendererStory5 {
  __dr: string
}

export interface Attachment35 {
  deduplication_key: string
  target: Target4
  __typename: string
  style_list: string[]
  styles: Styles6
  throwbackStyles: any
  comet_footer_renderer: CometFooterRenderer5
  comet_footer_disclaimer_renderer: any
  media: Media19
  all_subattachments: AllSubattachments10
}

export interface Target4 {
  __typename: string
  id: string
}

export interface Styles6 {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment36
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment6
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment6
}

export interface Attachment36 {
  mediaset_token: string
  url: string
  all_subattachments: AllSubattachments9
  comet_product_tag_feed_overlay_renderer: any
}

export interface AllSubattachments9 {
  count: number
  nodes: Node18[]
}

export interface Node18 {
  deduplication_key: string
  media: Media18
  url: string
}

export interface Media18 {
  __typename: string
  is_playable: boolean
  image: Image12
  viewer_image: ViewerImage8
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption: string
  focus: Focus8
  owner: Owner13
  __isNode: string
}

export interface Image12 {
  uri: string
  height: number
  width: number
}

export interface ViewerImage8 {
  height: number
  width: number
  uri: string
}

export interface Focus8 {
  x: number
  y: number
}

export interface Owner13 {
  __typename: string
  id: string
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment6 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment6 {
  __dr: string
}

export interface CometFooterRenderer5 {
  __typename: string
  attachment: Attachment37
  __module_operation_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment5
  __module_component_CometFeedStoryAttachmentFooterMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment5
}

export interface Attachment37 {
  ghl_mocked_footer_info: GhlMockedFooterInfo5
}

export interface GhlMockedFooterInfo5 {
  headline: string
  footer_body: string
  link: string
  meta: string
  cta_button: CtaButton5
}

export interface CtaButton5 {
  attributes: any[]
  styles: Style23[]
  text: any
  tag: string
  children: Children12[]
}

export interface Style23 {
  name: string
  val: string
}

export interface Children12 {
  attributes: Attribute12[]
  styles: Style24[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute12 {
  name: string
  val: string
}

export interface Style24 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedStoryAttachmentFooterMatchRendererAttachment5 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentFooterMatchRendererAttachment5 {
  __dr: string
}

export interface Media19 {
  __typename: string
  __isNode: string
  id: string
}

export interface AllSubattachments10 {
  nodes: Node19[]
}

export interface Node19 {
  media: Media20
}

export interface Media20 {
  __typename: string
  __isNode: string
  id: string
}

export interface FutureOfFeedInfo7 {
  dominant_readable_color?: string
}

export interface TextFormatMetadata6 {
  __typename: string
}

export interface Actor16 {
  __typename: string
  id: string
  name: string
  __isEntity: string
  url: string
}

export interface Message22 {
  __typename: string
  text: string
}

export interface TargetGroup5 {
  id: string
}

export interface ModuleOperationCometFeedStoryContentMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryContentMatchRendererStory3 {
  __dr: string
}

export interface Layout3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  __module_operation_CometFeedStoryLayoutMatchRenderer_story: ModuleOperationCometFeedStoryLayoutMatchRendererStory3
  __module_component_CometFeedStoryLayoutMatchRenderer_story: ModuleComponentCometFeedStoryLayoutMatchRendererStory3
}

export interface ModuleOperationCometFeedStoryLayoutMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryLayoutMatchRendererStory3 {
  __dr: string
}

export interface ContextLayout3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  local_alerts_story_menu_promotion: any
  story: Story37
  is_regulation_enforced: boolean
  __module_operation_CometFeedStoryContextSectionMatchRenderer_story: ModuleOperationCometFeedStoryContextSectionMatchRendererStory3
  __module_component_CometFeedStoryContextSectionMatchRenderer_story: ModuleComponentCometFeedStoryContextSectionMatchRendererStory3
}

export interface Story37 {
  id: string
  debug_info: any
  serialized_frtp_identifiers: any
  can_viewer_see_menu: boolean
  comet_sections: CometSections25
  encrypted_tracking: string
  easy_hide_button_story: any
}

export interface CometSections25 {
  actor_photo: ActorPhoto4
  metadata: Metadaum4[]
  title: Title8
}

export interface ActorPhoto4 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story38
  has_commerce_attachment: boolean
  __module_operation_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory4
  __module_component_CometFeedStoryActorPhotoSectionMatchRenderer_story: ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory4
}

export interface Story38 {
  actors: Actor17[]
  comet_sections: CometSections26
  attachments: Attachment38[]
  daspo_sto: any
  id: string
}

export interface Actor17 {
  __typename: string
  __isActor: string
  id: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
  story_bucket: StoryBucket4
  live_video_for_comet_live_ring: any
  profile_url: string
  name: string
  profile_picture: ProfilePicture6
  is_additional_profile_plus: boolean
  delegate_page: any
}

export interface StoryBucket4 {
  nodes: any[]
}

export interface ProfilePicture6 {
  uri: string
  width: number
  height: number
  scale: number
}

export interface CometSections26 {
  action_link: ActionLink18
}

export interface ActionLink18 {
  __typename: string
  has_member_profile: boolean
  group: Group5
  actor: Actor18
  __module_operation_CometFeedStoryActorLink_story: ModuleOperationCometFeedStoryActorLinkStory4
  __module_component_CometFeedStoryActorLink_story: ModuleComponentCometFeedStoryActorLinkStory4
}

export interface Group5 {
  id: string
  __typename: string
}

export interface Actor18 {
  __typename: string
  id: string
  __isEntity: string
  url: string
}

export interface ModuleOperationCometFeedStoryActorLinkStory4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorLinkStory4 {
  __dr: string
}

export interface Attachment38 {
  action_links: any[]
}

export interface ModuleOperationCometFeedStoryActorPhotoSectionMatchRendererStory4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorPhotoSectionMatchRendererStory4 {
  __dr: string
}

export interface Metadaum4 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  override_url: any
  video_override_url: any
  story: Story39
  __module_operation_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory4
  __module_component_CometFeedStoryMetadataSectionMatchRenderer_story: ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory4
}

export interface Story39 {
  creation_time?: number
  url?: string
  ghl_label?: GhlLabel5
  id: string
  privacy_scope?: PrivacyScope6
  user_signals_info?: UserSignalsInfo3
}

export interface GhlLabel5 {
  attributes: any[]
  styles: Style25[]
  text: any
  tag: string
  children: Children13[]
}

export interface Style25 {
  name: string
  val: string
}

export interface Children13 {
  attributes: Attribute13[]
  styles: Style26[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute13 {
  name: string
  val: string
}

export interface Style26 {
  name: string
  val: string
}

export interface PrivacyScope6 {
  icon_image: IconImage6
  description: string
}

export interface IconImage6 {
  name: string
}

export interface UserSignalsInfo3 {
  displayed_user_signals: DisplayedUserSignal3[]
  has_more: boolean
  overflow_uri: any
  total_count: number
  show_middot: boolean
}

export interface DisplayedUserSignal3 {
  id: string
  signal_type_id: string
  lightModeImage: LightModeImage2
  darkModeImage: DarkModeImage2
  tag_render_info: TagRenderInfo3
  title: Title7
}

export interface LightModeImage2 {
  uri: string
}

export interface DarkModeImage2 {
  uri: string
}

export interface TagRenderInfo3 {
  comet_detail_view: any
  color_variant: string
  layout_type: string
}

export interface Title7 {
  text: string
}

export interface ModuleOperationCometFeedStoryMetadataSectionMatchRendererStory4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryMetadataSectionMatchRendererStory4 {
  __dr: string
}

export interface Title8 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story40
  __module_operation_CometFeedStoryTitleSectionMatchRenderer_story: ModuleOperationCometFeedStoryTitleSectionMatchRendererStory4
  __module_component_CometFeedStoryTitleSectionMatchRenderer_story: ModuleComponentCometFeedStoryTitleSectionMatchRendererStory4
}

export interface Story40 {
  id: string
  actors: Actor19[]
  collaborators: any[]
  title: any
  comet_sections: CometSections27
  encrypted_tracking: string
}

export interface Actor19 {
  __typename: string
  name: string
  id: string
  __isActor: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
}

export interface CometSections27 {
  action_link: ActionLink19
  follow_button: any
  badge: any
}

export interface ActionLink19 {
  __typename: string
  has_member_profile: boolean
  group: Group6
  actor: Actor20
  __module_operation_CometFeedStoryActorLink_story: ModuleOperationCometFeedStoryActorLinkStory5
  __module_component_CometFeedStoryActorLink_story: ModuleComponentCometFeedStoryActorLinkStory5
}

export interface Group6 {
  id: string
  __typename: string
}

export interface Actor20 {
  __typename: string
  id: string
  __isEntity: string
  url: string
}

export interface ModuleOperationCometFeedStoryActorLinkStory5 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorLinkStory5 {
  __dr: string
}

export interface ModuleOperationCometFeedStoryTitleSectionMatchRendererStory4 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryTitleSectionMatchRendererStory4 {
  __dr: string
}

export interface ModuleOperationCometFeedStoryContextSectionMatchRendererStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryContextSectionMatchRendererStory3 {
  __dr: string
}

export interface Feedback25 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story41
  __module_operation_CometFeedStoryFeedbackSection_story: ModuleOperationCometFeedStoryFeedbackSectionStory3
  __module_component_CometFeedStoryFeedbackSection_story: ModuleComponentCometFeedStoryFeedbackSectionStory3
}

export interface Story41 {
  feedback_context: FeedbackContext5
  story_ufi_container: StoryUfiContainer3
  id: string
}

export interface FeedbackContext5 {
  feedback_target_with_context: FeedbackTargetWithContext5
}

export interface FeedbackTargetWithContext5 {
  viewer_actor: ViewerActor19
  id: string
}

export interface ViewerActor19 {
  __typename: string
  id: string
}

export interface StoryUfiContainer3 {
  __typename: string
  story: Story42
  __module_operation_CometFeedUFIContainer_story: ModuleOperationCometFeedUficontainerStory3
  __module_component_CometFeedUFIContainer_story: ModuleComponentCometFeedUficontainerStory3
}

export interface Story42 {
  encrypted_tracking: string
  is_text_only_story: boolean
  feedback_context: FeedbackContext6
  shareable_from_perspective_of_feed_ufi: any
  id: string
  url: string
  post_id: string
  tracking: string
  daspo_sto: any
  inform_treatment_for_messaging: any
  target_group: TargetGroup6
  click_tracking_linkshim_cb: string
  encrypted_click_tracking: string
  __module_operation_useCometUFIAdaptivePostActionBar_story: ModuleOperationUseCometUfiadaptivePostActionBarStory3
  __module_component_useCometUFIAdaptivePostActionBar_story: ModuleComponentUseCometUfiadaptivePostActionBarStory3
  vote_attachments: any[]
  feed_backend_data: FeedBackendData3
}

export interface FeedbackContext6 {
  feedback_target_with_context: FeedbackTargetWithContext6
  interesting_top_level_comments: InterestingTopLevelComment3[]
}

export interface FeedbackTargetWithContext6 {
  id: string
  owning_profile: OwningProfile5
  can_viewer_comment: boolean
  comment_rendering_instance: CommentRenderingInstance7
  comet_ufi_summary_and_actions_renderer: CometUfiSummaryAndActionsRenderer3
  is_community_qa_or_qaish_post: boolean
  threading_config?: ThreadingConfig3
  actor_provider: ActorProvider5
  viewer_actor: ViewerActor23
  url: string
  __typename: string
  if_viewer_can_comment_anonymously: any
  plugins: Plugin5[]
  comment_composer_placeholder: string
  have_comments_been_disabled: boolean
  default_comment_ordering_mode: string
  inline_composer_visible_by_default: boolean
  associated_group: AssociatedGroup7
  work_comment_summaries_from_feedback: any
  are_live_video_comments_disabled: boolean
  is_viewer_muted: boolean
  comments_disabled_notice_renderer: CommentsDisabledNoticeRenderer3
  comment_moderation_filter_restriction_notice: any
}

export interface OwningProfile5 {
  __typename: string
  name: string
  short_name: string
  id: string
}

export interface CommentRenderingInstance7 {
  comments: Comments7
}

export interface Comments7 {
  total_count: number
}

export interface CometUfiSummaryAndActionsRenderer3 {
  __typename: string
  feedback: Feedback26
  __module_operation_CometUFISummaryAndActions_feedback: ModuleOperationCometUfisummaryAndActionsFeedback3
  __module_component_CometUFISummaryAndActions_feedback: ModuleComponentCometUfisummaryAndActionsFeedback3
}

export interface Feedback26 {
  id: string
  subscription_target_id: string
  i18n_reaction_count: string
  important_reactors: ImportantReactors3
  reaction_count: ReactionCount5
  top_reactions: TopReactions7
  reaction_display_config: ReactionDisplayConfig5
  viewer_actor: ViewerActor20
  viewer_feedback_reaction_info: any
  can_show_seen_by: boolean
  if_viewer_can_see_seen_by_member_list: any
  if_viewer_cannot_see_seen_by_member_list: IfViewerCannotSeeSeenByMemberList3
  i18n_share_count: string
  share_count: ShareCount3
  comments_count_summary_renderer: CommentsCountSummaryRenderer3
  associated_video: any
  comment_rendering_instance: CommentRenderingInstance9
  page_private_reply: any
  video_view_count: any
  video_view_count_renderer: any
  is_similar_cqa_question: boolean
  message_action: MessageAction2
  ufi_action_renderers: UfiActionRenderer3[]
  should_show_reshare_warning: boolean
  adaptive_ufi_action_renderers: AdaptiveUfiActionRenderer3[]
}

export interface ImportantReactors3 {
  nodes: any[]
}

export interface ReactionCount5 {
  count: number
  is_empty: boolean
}

export interface TopReactions7 {
  count: number
  edges: Edge6[]
}

export interface Edge6 {
  visible_in_bling_bar: boolean
  node: Node20
  i18n_reaction_count: string
  reaction_count: number
}

export interface Node20 {
  id: string
  localized_name: string
}

export interface ReactionDisplayConfig5 {
  reaction_display_strategy: string
  reaction_string_with_viewer: any
  reaction_string_without_viewer: any
  __module_operation_CometUFIReactionsCount_feedback: ModuleOperationCometUfireactionsCountFeedback3
  __module_component_CometUFIReactionsCount_feedback: ModuleComponentCometUfireactionsCountFeedback3
}

export interface ModuleOperationCometUfireactionsCountFeedback3 {
  __dr: string
}

export interface ModuleComponentCometUfireactionsCountFeedback3 {
  __dr: string
}

export interface ViewerActor20 {
  __typename: string
  id: string
  name: string
}

export interface IfViewerCannotSeeSeenByMemberList3 {
  i18n_reaction_count: string
  reaction_count: ReactionCount6
  reaction_display_config: ReactionDisplayConfig6
  seen_by: SeenBy3
  __module_operation_CometUFISeenByCount_feedback__if_viewer_cannot_see_seen_by_member_list: ModuleOperationCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList3
  __module_component_CometUFISeenByCount_feedback__if_viewer_cannot_see_seen_by_member_list: ModuleComponentCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList3
  id: string
}

export interface ReactionCount6 {
  count: number
}

export interface ReactionDisplayConfig6 {
  reaction_display_strategy: string
}

export interface SeenBy3 {
  count: number
  i18n_seen_by_count: any
  seen_by_everyone: boolean
}

export interface ModuleOperationCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList3 {
  __dr: string
}

export interface ModuleComponentCometUfiseenByCountFeedbackIfViewerCannotSeeSeenByMemberList3 {
  __dr: string
}

export interface ShareCount3 {
  count: number
  is_empty: boolean
}

export interface CommentsCountSummaryRenderer3 {
  __typename: string
  feedback: Feedback27
  __module_operation_CometUFISummaryBase_feedback: ModuleOperationCometUfisummaryBaseFeedback3
  __module_component_CometUFISummaryBase_feedback: ModuleComponentCometUfisummaryBaseFeedback3
}

export interface Feedback27 {
  id: string
  comment_rendering_instance: CommentRenderingInstance8
}

export interface CommentRenderingInstance8 {
  comments: Comments8
}

export interface Comments8 {
  total_count: number
}

export interface ModuleOperationCometUfisummaryBaseFeedback3 {
  __dr: string
}

export interface ModuleComponentCometUfisummaryBaseFeedback3 {
  __dr: string
}

export interface CommentRenderingInstance9 {
  comments: Comments9
}

export interface Comments9 {
  total_count: number
}

export interface MessageAction2 {
  __typename: string
  __module_operation_useCometUFIPostActionBar_feedback_message_action: ModuleOperationUseCometUfipostActionBarFeedbackMessageAction2
  __module_component_useCometUFIPostActionBar_feedback_message_action: ModuleComponentUseCometUfipostActionBarFeedbackMessageAction2
}

export interface ModuleOperationUseCometUfipostActionBarFeedbackMessageAction2 {
  __dr: string
}

export interface ModuleComponentUseCometUfipostActionBarFeedbackMessageAction2 {
  __dr: string
}

export interface UfiActionRenderer3 {
  __typename: string
  feedback?: Feedback28
  hideLabelForAMA?: boolean
  __module_operation_useCometUFIPostActionBar_feedback__ufi_action_renderers: ModuleOperationUseCometUfipostActionBarFeedbackUfiActionRenderers3
  __module_component_useCometUFIPostActionBar_feedback__ufi_action_renderers: ModuleComponentUseCometUfipostActionBarFeedbackUfiActionRenderers3
}

export interface Feedback28 {
  viewer_feedback_reaction_info: any
  supported_reaction_infos: SupportedReactionInfo7[]
  comet_ufi_reaction_icon_renderer: CometUfiReactionIconRenderer7
  id: string
  viewer_actor: ViewerActor21
}

export interface SupportedReactionInfo7 {
  animation: Animation7
  id: string
}

export interface Animation7 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer7 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback7
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback7
}

export interface ModuleOperationCometUfireactionStrategyFeedback7 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback7 {
  __dr: string
}

export interface ViewerActor21 {
  __typename: string
  id: string
}

export interface ModuleOperationUseCometUfipostActionBarFeedbackUfiActionRenderers3 {
  __dr: string
}

export interface ModuleComponentUseCometUfipostActionBarFeedbackUfiActionRenderers3 {
  __dr: string
}

export interface AdaptiveUfiActionRenderer3 {
  __typename: string
  feedback?: Feedback29
  hideLabelForAMA?: boolean
  __module_operation_useCometUFIAdaptivePostActionBar_feedback: ModuleOperationUseCometUfiadaptivePostActionBarFeedback3
  __module_component_useCometUFIAdaptivePostActionBar_feedback: ModuleComponentUseCometUfiadaptivePostActionBarFeedback3
}

export interface Feedback29 {
  viewer_feedback_reaction_info: any
  supported_reaction_infos: SupportedReactionInfo8[]
  comet_ufi_reaction_icon_renderer: CometUfiReactionIconRenderer8
  id: string
  viewer_actor: ViewerActor22
}

export interface SupportedReactionInfo8 {
  animation: Animation8
  id: string
}

export interface Animation8 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer8 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback8
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback8
}

export interface ModuleOperationCometUfireactionStrategyFeedback8 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback8 {
  __dr: string
}

export interface ViewerActor22 {
  __typename: string
  id: string
}

export interface ModuleOperationUseCometUfiadaptivePostActionBarFeedback3 {
  __dr: string
}

export interface ModuleComponentUseCometUfiadaptivePostActionBarFeedback3 {
  __dr: string
}

export interface ModuleOperationCometUfisummaryAndActionsFeedback3 {
  __dr: string
}

export interface ModuleComponentCometUfisummaryAndActionsFeedback3 {
  __dr: string
}

export interface ThreadingConfig3 {
  __typename: string
}

export interface ActorProvider5 {
  __typename: string
  current_actor: CurrentActor5
  id: string
}

export interface CurrentActor5 {
  __typename: string
  id: string
  __isActor: string
  name: string
  profile_picture_depth_0: ProfilePictureDepth07
  profile_picture_depth_1: ProfilePictureDepth17
  gender: string
}

export interface ProfilePictureDepth07 {
  uri: string
}

export interface ProfilePictureDepth17 {
  uri: string
}

export interface ViewerActor23 {
  __typename: string
  id: string
}

export interface Plugin5 {
  __typename: string
  group_id?: string
  post_id?: string
  __module_operation_useCometUFIComposerPlugins_feedback: ModuleOperationUseCometUficomposerPluginsFeedback5
  __module_component_useCometUFIComposerPlugins_feedback: ModuleComponentUseCometUficomposerPluginsFeedback5
  has_avatar?: boolean
  feedback_id?: string
  avatar_style_version: any
  emoji_size?: number
  viewer_actor?: ViewerActor24
  should_condense_video_preview?: boolean
  owning_profile_id?: string
}

export interface ModuleOperationUseCometUficomposerPluginsFeedback5 {
  __dr: string
}

export interface ModuleComponentUseCometUficomposerPluginsFeedback5 {
  __dr: string
}

export interface ViewerActor24 {
  __typename: string
  id: string
}

export interface AssociatedGroup7 {
  id: string
}

export interface CommentsDisabledNoticeRenderer3 {
  __typename: string
  notice_message: NoticeMessage3
  __module_operation_CometUFICommentDisabledNotice_feedback: ModuleOperationCometUficommentDisabledNoticeFeedback3
  __module_component_CometUFICommentDisabledNotice_feedback: ModuleComponentCometUficommentDisabledNoticeFeedback3
}

export interface NoticeMessage3 {
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
}

export interface ModuleOperationCometUficommentDisabledNoticeFeedback3 {
  __dr: string
}

export interface ModuleComponentCometUficommentDisabledNoticeFeedback3 {
  __dr: string
}

export interface InterestingTopLevelComment3 {
  comment: Comment5
  relevant_contextual_replies: RelevantContextualReplies3
}

export interface Comment5 {
  id: string
  legacy_fbid: string
  depth: number
  body: Body3
  attachments: any[]
  is_markdown_enabled: boolean
  community_comment_signal_renderer: any
  comment_menu_tooltip: string
  should_show_comment_menu: boolean
  author: Author6
  is_author_weak_reference: boolean
  comment_action_links: CommentActionLink3[]
  feedback: Feedback31
  preferred_body: PreferredBody3
  body_renderer: BodyRenderer3
  comment_parent: any
  is_declined_by_group_admin_assistant: boolean
  is_gaming_video_comment: boolean
  timestamp_in_video: any
  translatability_for_viewer: TranslatabilityForViewer3
  written_while_video_was_live: boolean
  group_comment_info: GroupCommentInfo2
  bizweb_comment_info: any
  has_constituent_badge: boolean
  can_viewer_see_subsribe_button: boolean
  can_see_constituent_badge_upsell: boolean
  legacy_token: string
  parent_feedback: ParentFeedback3
  question_and_answer_type: any
  author_user_signals_renderer?: AuthorUserSignalsRenderer2
  author_badge_renderers: any[]
  identity_badges_web: any[]
  can_show_multiple_identity_badges: boolean
  discoverable_identity_badges_web: any[]
  user: User3
  is_viewer_comment_poster: boolean
  parent_post_story: ParentPostStory3
  work_ama_answer_status: any
  work_knowledge_inline_annotation_comment_badge_renderer: any
  business_comment_attributes: any[]
  is_live_video_comment: boolean
  created_time: number
  translation_available_for_viewer: boolean
  inline_survey_config: any
  spam_display_mode: string
  attached_story: any
  comment_direct_parent: any
  if_viewer_can_see_member_page_tooltip: any
  is_disabled: boolean
  work_answered_event_comment_renderer: any
  comment_upper_badge_renderer: any
  elevated_comment_data: any
  inline_replies_expander_renderer: any
}

export interface Body3 {
  text: string
  ranges: any[]
}

export interface Author6 {
  __typename: string
  id: string
  name: string
  __isActor: string
  profile_picture_depth_0: ProfilePictureDepth08
  profile_picture_depth_1: ProfilePictureDepth18
  gender: string
  __isEntity: string
  url: string
  work_info: any
  is_verified: boolean
  short_name: string
  subscribe_status: string
}

export interface ProfilePictureDepth08 {
  uri: string
}

export interface ProfilePictureDepth18 {
  uri: string
}

export interface CommentActionLink3 {
  __typename: string
  comment: Comment6
  __module_operation_CometUFICommentActionLinks_comment: ModuleOperationCometUficommentActionLinksComment3
  __module_component_CometUFICommentActionLinks_comment: ModuleComponentCometUficommentActionLinksComment3
}

export interface Comment6 {
  id: string
  created_time?: number
  url?: string
  is_live_video_comment?: boolean
  feedback?: Feedback30
  comment_parent: any
  is_author_weak_reference?: boolean
  legacy_fbid?: string
  author?: Author7
}

export interface Feedback30 {
  comment_composer_placeholder?: string
  id: string
  viewer_feedback_reaction_info: any
  viewer_actor?: ViewerActor25
  supported_reaction_infos?: SupportedReactionInfo9[]
  comet_ufi_reaction_icon_renderer?: CometUfiReactionIconRenderer9
  associated_video: any
  top_reactions?: TopReactions8
  unified_reactors?: UnifiedReactors3
  reactors?: Reactors5
}

export interface ViewerActor25 {
  __typename: string
  id: string
}

export interface SupportedReactionInfo9 {
  animation: Animation9
  id: string
}

export interface Animation9 {
  uri_keyframes2: string
}

export interface CometUfiReactionIconRenderer9 {
  __typename: string
  __module_operation_CometUFIReactionStrategy_feedback: ModuleOperationCometUfireactionStrategyFeedback9
  __module_component_CometUFIReactionStrategy_feedback: ModuleComponentCometUfireactionStrategyFeedback9
}

export interface ModuleOperationCometUfireactionStrategyFeedback9 {
  __dr: string
}

export interface ModuleComponentCometUfireactionStrategyFeedback9 {
  __dr: string
}

export interface TopReactions8 {
  edges: Edge7[]
}

export interface Edge7 {
  reaction_count: number
  node: Node21
}

export interface Node21 {
  id: string
}

export interface UnifiedReactors3 {
  count: number
}

export interface Reactors5 {
  count: number
  is_empty: boolean
}

export interface Author7 {
  __typename: string
  id: string
  name: string
  url: string
}

export interface ModuleOperationCometUficommentActionLinksComment3 {
  __dr: string
}

export interface ModuleComponentCometUficommentActionLinksComment3 {
  __dr: string
}

export interface Feedback31 {
  viewer_feedback_reaction_info: any
  id: string
  top_reactions: TopReactions9
  reactors: Reactors6
  total_reply_count: number
  viewer_actor: ViewerActor26
  actor_provider: ActorProvider6
  url: string
  __typename: string
  if_viewer_can_comment_anonymously: any
  plugins: Plugin6[]
  comment_composer_placeholder: string
  can_viewer_comment: boolean
  have_comments_been_disabled: boolean
  default_comment_ordering_mode: string
  inline_composer_visible_by_default: boolean
  comment_rendering_instance: any
  associated_group: AssociatedGroup8
}

export interface TopReactions9 {
  edges: Edge8[]
}

export interface Edge8 {
  visible_in_bling_bar: boolean
  node: Node22
  reaction_count: number
}

export interface Node22 {
  id: string
}

export interface Reactors6 {
  count_reduced: string
}

export interface ViewerActor26 {
  __typename: string
  id: string
}

export interface ActorProvider6 {
  __typename: string
  current_actor: CurrentActor6
  id: string
}

export interface CurrentActor6 {
  __typename: string
  id: string
  __isActor: string
  name: string
  profile_picture_depth_0: ProfilePictureDepth09
  profile_picture_depth_1: ProfilePictureDepth19
  gender: string
}

export interface ProfilePictureDepth09 {
  uri: string
}

export interface ProfilePictureDepth19 {
  uri: string
}

export interface Plugin6 {
  __typename: string
  group_id?: string
  post_id?: string
  __module_operation_useCometUFIComposerPlugins_feedback: ModuleOperationUseCometUficomposerPluginsFeedback6
  __module_component_useCometUFIComposerPlugins_feedback: ModuleComponentUseCometUficomposerPluginsFeedback6
  has_avatar?: boolean
  feedback_id?: string
  avatar_style_version: any
  emoji_size?: number
  viewer_actor?: ViewerActor27
  should_condense_video_preview?: boolean
  owning_profile_id?: string
}

export interface ModuleOperationUseCometUficomposerPluginsFeedback6 {
  __dr: string
}

export interface ModuleComponentUseCometUficomposerPluginsFeedback6 {
  __dr: string
}

export interface ViewerActor27 {
  __typename: string
  id: string
}

export interface AssociatedGroup8 {
  id: string
}

export interface PreferredBody3 {
  __typename: string
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
  translation_type: string
}

export interface BodyRenderer3 {
  __typename: string
  delight_ranges: any[]
  image_ranges: any[]
  inline_style_ranges: any[]
  aggregated_ranges: any[]
  ranges: any[]
  color_ranges: any[]
  text: string
  __module_operation_CometUFICommentTextBodyRenderer_comment: ModuleOperationCometUficommentTextBodyRendererComment3
  __module_component_CometUFICommentTextBodyRenderer_comment: ModuleComponentCometUficommentTextBodyRendererComment3
}

export interface ModuleOperationCometUficommentTextBodyRendererComment3 {
  __dr: string
}

export interface ModuleComponentCometUficommentTextBodyRendererComment3 {
  __dr: string
}

export interface TranslatabilityForViewer3 {
  source_dialect: string
}

export interface GroupCommentInfo2 {
  group: Group7
  is_author_anonymous: boolean
  is_author_with_member_profile: boolean
  __module_operation_CometUFICommentActorLink_comment_groups: ModuleOperationCometUficommentActorLinkCommentGroups2
  __module_component_CometUFICommentActorLink_comment_groups: ModuleComponentCometUficommentActorLinkCommentGroups2
}

export interface Group7 {
  id: string
  __typename: string
}

export interface ModuleOperationCometUficommentActorLinkCommentGroups2 {
  __dr: string
}

export interface ModuleComponentCometUficommentActorLinkCommentGroups2 {
  __dr: string
}

export interface ParentFeedback3 {
  id: string
  share_fbid: string
  political_figure_data: any
  owning_profile: OwningProfile6
}

export interface OwningProfile6 {
  __typename: string
  name: string
  id: string
}

export interface AuthorUserSignalsRenderer2 {
  __typename: string
  user_signals_info: UserSignalsInfo4
  __module_operation_CometUFICommentActorLinkBadges_comment: ModuleOperationCometUficommentActorLinkBadgesComment2
  __module_component_CometUFICommentActorLinkBadges_comment: ModuleComponentCometUficommentActorLinkBadgesComment2
}

export interface UserSignalsInfo4 {
  displayed_user_signals: DisplayedUserSignal4[]
  has_more: boolean
  overflow_uri: any
  total_count: number
  show_middot: any
}

export interface DisplayedUserSignal4 {
  id: string
  signal_type_id: string
  lightModeImage: LightModeImage3
  darkModeImage: DarkModeImage3
  tag_render_info: TagRenderInfo4
  title: Title9
}

export interface LightModeImage3 {
  uri: string
}

export interface DarkModeImage3 {
  uri: string
}

export interface TagRenderInfo4 {
  comet_detail_view: any
  color_variant: string
  layout_type: string
}

export interface Title9 {
  text: string
}

export interface ModuleOperationCometUficommentActorLinkBadgesComment2 {
  __dr: string
}

export interface ModuleComponentCometUficommentActorLinkBadgesComment2 {
  __dr: string
}

export interface User3 {
  name: string
  profile_picture: ProfilePicture7
  id: string
}

export interface ProfilePicture7 {
  uri: string
}

export interface ParentPostStory3 {
  attachments: Attachment39[]
  id: string
}

export interface Attachment39 {
  media: Media21
}

export interface Media21 {
  __typename: string
  __isNode: string
  id: string
}

export interface RelevantContextualReplies3 {
  nodes: any[]
}

export interface TargetGroup6 {
  id: string
  visibility: string
  privacy_info: PrivacyInfo2
}

export interface PrivacyInfo2 {
  icon_name: string
  description: Description2
}

export interface Description2 {
  text: string
}

export interface ModuleOperationUseCometUfiadaptivePostActionBarStory3 {
  __dr: string
}

export interface ModuleComponentUseCometUfiadaptivePostActionBarStory3 {
  __dr: string
}

export interface FeedBackendData3 {
  pcomment: number
}

export interface ModuleOperationCometFeedUficontainerStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedUficontainerStory3 {
  __dr: string
}

export interface ModuleOperationCometFeedStoryFeedbackSectionStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryFeedbackSectionStory3 {
  __dr: string
}

export interface CallToAction3 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  story: Story43
  __module_operation_CometFeedStoryCallToActionSection_story: ModuleOperationCometFeedStoryCallToActionSectionStory3
  __module_component_CometFeedStoryCallToActionSection_story: ModuleComponentCometFeedStoryCallToActionSectionStory3
}

export interface Story43 {
  bumpers: any
  tracking: string
  id: string
}

export interface ModuleOperationCometFeedStoryCallToActionSectionStory3 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryCallToActionSectionStory3 {
  __dr: string
}

export interface ActionLink20 {
  __typename: string
  has_member_profile: boolean
  group: Group8
  actor: Actor21
  __module_operation_CometFeedStoryActorLink_story: ModuleOperationCometFeedStoryActorLinkStory6
  __module_component_CometFeedStoryActorLink_story: ModuleComponentCometFeedStoryActorLinkStory6
}

export interface Group8 {
  id: string
  __typename: string
}

export interface Actor21 {
  __typename: string
  id: string
  __isEntity: string
  url: string
}

export interface ModuleOperationCometFeedStoryActorLinkStory6 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryActorLinkStory6 {
  __dr: string
}

export interface Timestamp2 {
  __typename: string
  __isICometStorySection: string
  is_prod_eligible: boolean
  override_url: any
  video_override_url: any
  story: Story44
  __module_operation_CometFeedStoryTimestampSection_story: ModuleOperationCometFeedStoryTimestampSectionStory2
  __module_component_CometFeedStoryTimestampSection_story: ModuleComponentCometFeedStoryTimestampSectionStory2
}

export interface Story44 {
  creation_time: number
  url: string
  ghl_label: GhlLabel6
  id: string
}

export interface GhlLabel6 {
  attributes: any[]
  styles: Style27[]
  text: any
  tag: string
  children: Children14[]
}

export interface Style27 {
  name: string
  val: string
}

export interface Children14 {
  attributes: Attribute14[]
  styles: Style28[]
  text: string
  tag: string
  children: any[]
}

export interface Attribute14 {
  name: string
  val: string
}

export interface Style28 {
  name: string
  val: string
}

export interface ModuleOperationCometFeedStoryTimestampSectionStory2 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryTimestampSectionStory2 {
  __dr: string
}

export interface Actor22 {
  __typename: string
  name: string
  id: string
  __isActor: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  work_info: any
}

export interface To4 {
  __typename: string
  __isActor: string
  id: string
  __isEntity: string
  url: string
  work_foreign_entity_info: any
  is_multi_company_group: boolean
  work_official_status: string
  name: string
}

export interface Attachment40 {
  styles: Styles7
}

export interface Styles7 {
  __typename: string
  __isStoryAttachmentStyleRendererUnion: string
  is_prod_eligible: boolean
  attachment: Attachment41
  __module_operation_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment7
  __module_component_CometFeedStoryAttachmentMatchRenderer_attachment: ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment7
}

export interface Attachment41 {
  mediaset_token: string
  url: string
  all_subattachments: AllSubattachments11
  comet_product_tag_feed_overlay_renderer: any
}

export interface AllSubattachments11 {
  count: number
  nodes: Node23[]
}

export interface Node23 {
  deduplication_key: string
  media: Media22
  url: string
}

export interface Media22 {
  __typename: string
  is_playable: boolean
  image: Image13
  viewer_image: ViewerImage9
  id: string
  __isMedia: string
  photo_cix_screen: any
  copyright_banner_info: any
  accessibility_caption: string
  focus: Focus9
  owner: Owner14
  __isNode: string
}

export interface Image13 {
  uri: string
  height: number
  width: number
}

export interface ViewerImage9 {
  height: number
  width: number
  uri: string
}

export interface Focus9 {
  x: number
  y: number
}

export interface Owner14 {
  __typename: string
  id: string
}

export interface ModuleOperationCometFeedStoryAttachmentMatchRendererAttachment7 {
  __dr: string
}

export interface ModuleComponentCometFeedStoryAttachmentMatchRendererAttachment7 {
  __dr: string
}

export interface ModuleOperationCometFeedUnitContainerSectionFeedUnit2 {
  __dr: string
}

export interface ModuleComponentCometFeedUnitContainerSectionFeedUnit2 {
  __dr: string
}

export interface Trackingdata2 {
  id: string
}

export interface ClientViewConfig2 {
  can_delay_log_impression: boolean
  use_banzai_signal_imp: boolean
  use_banzai_vital_imp: boolean
}

export interface PageInfo {
  end_cursor: string
  has_next_page: boolean
}

export interface InstreamExtraConfig {
  instream_halo_delay_time_seconds: number
}

export interface Video9 {
  id: string
  if_viewer_can_see_stars_on_reels_for_comet: any
  owner: Owner15
}

export interface Owner15 {
  __typename: string
  id: string
}

export interface Attachment42 {
  media: Media23
}

export interface Media23 {
  __typename: string
  video_owner_type: string
  __isNode: string
  id: string
  shareable_url: string
  remix_info: RemixInfo3
  owner: Owner16
  embeddable: boolean
}

export interface RemixInfo3 {
  is_remixable: boolean
  status: string
}

export interface Owner16 {
  __typename: string
  id: string
  name: string
}

export interface FbReelReactButton {
  __typename: string
  story: Story45
  __module_operation_FBReelsFeedbackBar_feedback: ModuleOperationFbreelsFeedbackBarFeedback
  __module_component_FBReelsFeedbackBar_feedback: ModuleComponentFbreelsFeedbackBarFeedback
}

export interface Story45 {
  id: string
  tracking: string
  feedback: Feedback32
}

export interface Feedback32 {
  id: string
  viewer_feedback_reaction_key: number
  associated_group: AssociatedGroup9
  likers: Likers
  unified_reactors: UnifiedReactors4
  reaction_display_config: ReactionDisplayConfig7
}

export interface AssociatedGroup9 {
  if_viewer_can_see_reel_group_attribution: IfViewerCanSeeReelGroupAttribution5
  id: string
}

export interface IfViewerCanSeeReelGroupAttribution5 {
  __typename: string
  id: string
}

export interface Likers {
  count: number
}

export interface UnifiedReactors4 {
  count: number
}

export interface ReactionDisplayConfig7 {
  reaction_display_strategy: string
}

export interface ModuleOperationFbreelsFeedbackBarFeedback {
  __dr: string
}

export interface ModuleComponentFbreelsFeedbackBarFeedback {
  __dr: string
}

export interface Feedback33 {
  total_comment_count: number
  cross_universe_feedback_info: CrossUniverseFeedbackInfo
  id: string
  share_count_reduced: string
  reels_poll_view_model: any
}

export interface CrossUniverseFeedbackInfo {
  ig_comment_count: any
}

export interface SaveInfo3 {
  viewer_save_state: string
}

export interface To5 {
  __typename: string
  id: string
}

export interface TransparencyAdInfo3 {
  menu_label: string
  should_display_ad_info: boolean
}

export interface Extensions {
  prefetch_uris_v2: PrefetchUrisV2[]
  is_final: boolean
  sr_payload?: SrPayload
  all_video_dash_prefetch_representations?: AllVideoDashPrefetchRepresentation[]
}

export interface PrefetchUrisV2 {
  uri: string
  label: any
}

export interface SrPayload {
  ddd: Ddd
}

export interface Ddd {
  hsrp: Hsrp
  jsmods: Jsmods
  allResources: string[]
  tieredResources: TieredResources
}

export interface Hsrp {
  hblp: Hblp
  hsdp?: Hsdp
}

export interface Hblp {
  consistency: Consistency
  rsrcMap: RsrcMap
  indexUpgrades: IndexUpgrades
  compMap?: CompMap
}

export interface Consistency {
  rev: number
}

export interface RsrcMap {
  "csr:_1q_6_Q0"?: Csr1q6Q0
  "csr:_1q_7_33"?: Csr1q733
  "csr:_1q_0_NM"?: Csr1q0Nm
  "csr:_1q_1_DB"?: Csr1q1Db
  "csr:_1q_2_0Q"?: Csr1q20Q
  "csr:_1q_3_pN"?: Csr1q3PN
  "csr:_1q_4_fa"?: Csr1q4Fa
  "csr:_1q_5_kv"?: Csr1q5Kv
  "csr:_1y_0_UI"?: Csr1y0Ui
  "csr:_1y_1_3F"?: Csr1y13F
  "csr:_1y_2_nZ"?: Csr1y2NZ
  "csr:_1y_3_ZZ"?: Csr1y3Zz
  "csr:_1y_4_Fo"?: Csr1y4Fo
  "csr:_1y_5_WD"?: Csr1y5Wd
  "csr:_22_0_sp"?: Csr220Sp
  "csr:_22_1_95"?: Csr22195
  "csr:_22_2_1a"?: Csr2221a
  "csr:_22_3_jG"?: Csr223JG
  tjEwMTD?: TjEwMtd
  YlVFMpU?: YlVfmpU
  "U/+l15K"?: UL15K
  "csr:_22_4_Wf"?: Csr224Wf
  "csr:_22_5_3l"?: Csr2253l
  "csr:_f_0_jf"?: CsrF0Jf
  "csr:_f_1_1w"?: CsrF11w
  YhlHZgH?: YhlHzgH
  "csr:_f_2_RX"?: CsrF2Rx
  "csr:_f_3_Gn"?: CsrF3Gn
  CUCE6k0?: Cuce6k0
  bKrpj0s?: BKrpj0s
  "0+g27VZ"?: N0G27Vz
  aGwzfBv?: AGwzfBv
  "csr:_u_2_Un"?: CsrU2Un
  "csr:_u_3_0U"?: CsrU30U
  jUKdRW9?: JUkdRw9
  "9zqYZWh"?: N9zqYzwh
  "csr:_u_0_Mj"?: CsrU0Mj
  "csr:_u_1_Am"?: CsrU1Am
  "csr:_11_0_Wk"?: Csr110Wk
  "csr:_11_1_ow"?: Csr111Ow
  "csr:_11_2_1T"?: Csr1121T
  "csr:_11_3_XU"?: Csr113Xu
  "csr:_15_0_fC"?: Csr150FC
  "csr:_15_1_lU"?: Csr151LU
  "csr:_15_2_g9"?: Csr152G9
  "csr:_15_3_iM"?: Csr153IM
  K1RKkU8?: K1RkkU8
  "csr:_15_4_+N"?: Csr154N
  "csr:_15_5_gu"?: Csr155Gu
  "csr:_15_6_gH"?: Csr156GH
  EBJy8GQ?: Ebjy8Gq
  "csr:_15_7_mD"?: Csr157MD
  "csr:_15_8_vb"?: Csr158Vb
}

export interface Csr1q6Q0 {
  type: string
  src: string
  c: number
}

export interface Csr1q733 {
  type: string
  src: string
  c: number
}

export interface Csr1q0Nm {
  type: string
  src: string
  c: number
}

export interface Csr1q1Db {
  type: string
  src: string
  c: number
}

export interface Csr1q20Q {
  type: string
  src: string
  c: number
}

export interface Csr1q3PN {
  type: string
  src: string
  c: number
}

export interface Csr1q4Fa {
  type: string
  src: string
  c: number
}

export interface Csr1q5Kv {
  type: string
  src: string
  c: number
}

export interface Csr1y0Ui {
  type: string
  src: string
  c: number
}

export interface Csr1y13F {
  type: string
  src: string
  c: number
}

export interface Csr1y2NZ {
  type: string
  src: string
  c: number
}

export interface Csr1y3Zz {
  type: string
  src: string
  c: number
}

export interface Csr1y4Fo {
  type: string
  src: string
  c: number
}

export interface Csr1y5Wd {
  type: string
  src: string
  c: number
}

export interface Csr220Sp {
  type: string
  src: string
  c: number
}

export interface Csr22195 {
  type: string
  src: string
  c: number
}

export interface Csr2221a {
  type: string
  src: string
  c: number
}

export interface Csr223JG {
  type: string
  src: string
  c: number
}

export interface TjEwMtd {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface YlVfmpU {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface UL15K {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface Csr224Wf {
  type: string
  src: string
  c: number
}

export interface Csr2253l {
  type: string
  src: string
  c: number
}

export interface CsrF0Jf {
  type: string
  src: string
  c: number
}

export interface CsrF11w {
  type: string
  src: string
  c: number
}

export interface YhlHzgH {
  type: string
  src: string
  c: number
  p: string
  m: string
}

export interface CsrF2Rx {
  type: string
  src: string
  c: number
}

export interface CsrF3Gn {
  type: string
  src: string
  c: number
}

export interface Cuce6k0 {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface BKrpj0s {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface N0G27Vz {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface AGwzfBv {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface CsrU2Un {
  type: string
  src: string
  c: number
}

export interface CsrU30U {
  type: string
  src: string
  c: number
}

export interface JUkdRw9 {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface N9zqYzwh {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface CsrU0Mj {
  type: string
  src: string
  c: number
}

export interface CsrU1Am {
  type: string
  src: string
  c: number
}

export interface Csr110Wk {
  type: string
  src: string
  c: number
}

export interface Csr111Ow {
  type: string
  src: string
  c: number
}

export interface Csr1121T {
  type: string
  src: string
  c: number
}

export interface Csr113Xu {
  type: string
  src: string
  c: number
}

export interface Csr150FC {
  type: string
  src: string
  c: number
}

export interface Csr151LU {
  type: string
  src: string
  c: number
}

export interface Csr152G9 {
  type: string
  src: string
  c: number
}

export interface Csr153IM {
  type: string
  src: string
  c: number
}

export interface K1RkkU8 {
  type: string
  src: string
  c: number
  p: string
  m: string
}

export interface Csr154N {
  type: string
  src: string
  c: number
}

export interface Csr155Gu {
  type: string
  src: string
  c: number
}

export interface Csr156GH {
  type: string
  src: string
  c: number
}

export interface Ebjy8Gq {
  type: string
  src: string
  d: number
  nc: number
  c: number
  p: string
  m: string
  nonce: string
}

export interface Csr157MD {
  type: string
  src: string
  c: number
}

export interface Csr158Vb {
  type: string
  src: string
  c: number
}

export interface IndexUpgrades {
  __hsdp?: string
  __hblp?: string
}

export interface CompMap {
  "CometUFICommentEditHistoryDialog.react": CometUficommentEditHistoryDialogReact
}

export interface CometUficommentEditHistoryDialogReact {
  r: string[]
  rdfds: Rdfds
  rds: Rds
  be: number
}

export interface Rdfds {
  m: string[]
  r: string[]
}

export interface Rds {
  m: string[]
  r: string[]
}

export interface Hsdp {
  gkxData: GkxData
  ixData: IxData
  qexData?: QexData
  clpData?: ClpData
  justknobxData?: JustknobxData
}

export interface GkxData {
  "10593"?: N10593
  "4229"?: N4229
  "440"?: N440
  "1460"?: N1460
  "4927"?: N4927
  "8034"?: N8034
  "10592"?: N10592
  "10769"?: N10769
  "11761"?: N11761
  "23009"?: N23009
  "24263"?: N24263
  "24325"?: N24325
  "24326"?: N24326
  "24328"?: N24328
  "24330"?: N24330
  "24345"?: N24345
  "24353"?: N24353
  "24354"?: N24354
  "24355"?: N24355
  "24356"?: N24356
  "24369"?: N24369
  "24370"?: N24370
  "24382"?: N24382
  "24384"?: N24384
  "24385"?: N24385
  "26220"?: N26220
  "1981"?: N1981
  "2162"?: N2162
  "23022"?: N23022
  "23024"?: N23024
}

export interface N10593 {
  result: boolean
  hash: any
}

export interface N4229 {
  result: boolean
  hash: any
}

export interface N440 {
  result: boolean
  hash: any
}

export interface N1460 {
  result: boolean
  hash: any
}

export interface N4927 {
  result: boolean
  hash: any
}

export interface N8034 {
  result: boolean
  hash: any
}

export interface N10592 {
  result: boolean
  hash: any
}

export interface N10769 {
  result: boolean
  hash: any
}

export interface N11761 {
  result: boolean
  hash: any
}

export interface N23009 {
  result: boolean
  hash: any
}

export interface N24263 {
  result: boolean
  hash: any
}

export interface N24325 {
  result: boolean
  hash: any
}

export interface N24326 {
  result: boolean
  hash: any
}

export interface N24328 {
  result: boolean
  hash: any
}

export interface N24330 {
  result: boolean
  hash: any
}

export interface N24345 {
  result: boolean
  hash: any
}

export interface N24353 {
  result: boolean
  hash: any
}

export interface N24354 {
  result: boolean
  hash: any
}

export interface N24355 {
  result: boolean
  hash: any
}

export interface N24356 {
  result: boolean
  hash: any
}

export interface N24369 {
  result: boolean
  hash: any
}

export interface N24370 {
  result: boolean
  hash: any
}

export interface N24382 {
  result: boolean
  hash: any
}

export interface N24384 {
  result: boolean
  hash: any
}

export interface N24385 {
  result: boolean
  hash: any
}

export interface N26220 {
  result: boolean
  hash: any
}

export interface N1981 {
  result: boolean
  hash: any
}

export interface N2162 {
  result: boolean
  hash: any
}

export interface N23022 {
  result: boolean
  hash: any
}

export interface N23024 {
  result: boolean
  hash: any
}

export interface IxData {
  "484385"?: N484385
  "491221"?: N491221
  "491223"?: N491223
  "547774"?: N547774
  "547775"?: N547775
  "648667"?: N648667
  "648669"?: N648669
  "478237"?: N478237
  "484391"?: N484391
  "484757"?: N484757
  "492454"?: N492454
  "492518"?: N492518
  "492521"?: N492521
  "492572"?: N492572
  "492575"?: N492575
  "505565"?: N505565
  "545517"?: N545517
  "621399"?: N621399
  "659288"?: N659288
  "785426"?: N785426
  "1876411"?: N1876411
  "1876412"?: N1876412
  "1876413"?: N1876413
  "1876414"?: N1876414
  "1876415"?: N1876415
  "1876416"?: N1876416
  "1876418"?: N1876418
  "1876419"?: N1876419
  "1876420"?: N1876420
  "1876421"?: N1876421
  "1876422"?: N1876422
  "1876423"?: N1876423
  "1876424"?: N1876424
  "1876426"?: N1876426
  "1876427"?: N1876427
  "1876428"?: N1876428
  "1876429"?: N1876429
  "1876430"?: N1876430
  "1876431"?: N1876431
  "1876432"?: N1876432
  "1876434"?: N1876434
  "1876435"?: N1876435
  "1876436"?: N1876436
  "1876437"?: N1876437
  "1876438"?: N1876438
  "1876439"?: N1876439
  "1876440"?: N1876440
  "1876442"?: N1876442
  "1876443"?: N1876443
  "1876444"?: N1876444
  "1876445"?: N1876445
  "1876446"?: N1876446
  "1876447"?: N1876447
  "1876448"?: N1876448
  "1876450"?: N1876450
  "1876451"?: N1876451
  "1876452"?: N1876452
  "1876453"?: N1876453
  "1876454"?: N1876454
  "1876455"?: N1876455
  "1876456"?: N1876456
  "1876458"?: N1876458
  "1940508"?: N1940508
  "1940509"?: N1940509
  "1940510"?: N1940510
  "1940511"?: N1940511
  "1940512"?: N1940512
  "1940513"?: N1940513
  "101640"?: N101640
  "352839"?: N352839
  "354763"?: N354763
  "517758"?: N517758
  "517763"?: N517763
  "528442"?: N528442
  "595830"?: N595830
  "680443"?: N680443
  "686157"?: N686157
}

export interface N484385 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N491221 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N491223 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N547774 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N547775 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N648667 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N648669 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N478237 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N484391 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N484757 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N492454 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N492518 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N492521 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N492572 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N492575 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N505565 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N545517 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N621399 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N659288 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N785426 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N1876411 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876412 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876413 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876414 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876415 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876416 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876418 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876419 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876420 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876421 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876422 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876423 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876424 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876426 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876427 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876428 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876429 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876430 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876431 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876432 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876434 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876435 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876436 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876437 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876438 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876439 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876440 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876442 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876443 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876444 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876445 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876446 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876447 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876448 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876450 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876451 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876452 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876453 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876454 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876455 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876456 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1876458 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1940508 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1940509 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1940510 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1940511 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1940512 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N1940513 {
  sprited: number
  uri: string
  width: number
  height: number
}

export interface N101640 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N352839 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N354763 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N517758 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N517763 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N528442 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N595830 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N680443 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface N686157 {
  sprited: number
  spi: string
  _spi: string
  w: number
  h: number
  p: string
  sz: string
}

export interface QexData {
  "1636"?: N1636
  "2104"?: N2104
  "576"?: N576
  "617"?: N617
  "1777"?: N1777
  "3492"?: N3492
  "3493"?: N3493
  "3494"?: N3494
  "3495"?: N3495
  "3496"?: N3496
  "4529"?: N4529
}

export interface N1636 {
  r: any
}

export interface N2104 {
  r: number
  l: string
}

export interface N576 {
  r: number
  l: string
}

export interface N617 {
  r: number
  l: string
}

export interface N1777 {
  r: number
  l: string
}

export interface N3492 {
  r: boolean
  l: string
}

export interface N3493 {
  r: boolean
  l: string
}

export interface N3494 {
  r: any
  l: string
}

export interface N3495 {
  r: any
  l: string
}

export interface N3496 {
  r: boolean
  l: string
}

export interface N4529 {
  r: any
}

export interface ClpData {
  "1923272"?: N1923272
  "1744552"?: N1744552
  "1856513"?: N1856513
}

export interface N1923272 {
  r: number
  s: number
}

export interface N1744552 {
  r: number
}

export interface N1856513 {
  r: number
  s: number
}

export interface JustknobxData {
  "717": N717
}

export interface N717 {
  r: boolean
}

export interface Jsmods {
  define?: [string, string[], Define, number][]
  require: any[][]
}

export interface Define {
  __rc?: string | undefined[]
  isSampled?: boolean
}

export interface TieredResources {
  r: string[]
  rdfds: any[]
  rds: string[]
}

export interface AllVideoDashPrefetchRepresentation {
  initial_representation_ids: any[]
  representations: Representation[]
  video_id: string
  nextgendash: boolean
}

export interface Representation {
  representation_id: string
  mime_type: string
  codecs: string
  base_url: string
  bandwidth: number
  height: number
  width: number
  playback_resolution_mos: string
  playback_resolution_csvqm: string
  segments: Segment[]
}

export interface Segment {
  start: number
  end: number
}
