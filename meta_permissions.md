# Permissions Reference for App Development with Meta

*(Source: Meta for Developers docs, captured via screenshot and OCR-converted — column ordering may occasionally be imperfect but content is preserved.)*

## Overview

Permissions are a form of granular, app user-granted Graph API authorization. Before your app can use an API endpoint to access an app user's data, your app user must grant your app all permissions required by that endpoint.

Only select permissions that your app needs to function as intended. Selecting unneeded permissions is a common reason for rejection during app review.

> You may also use any permission granted to your app to request analytics insights to improve your app and for marketing or advertising purposes, through the use of aggregated and de-identified or anonymized information (provided such data cannot be re-identified).

## Maintaining Data Requirements

- **Meta App Review** - For apps that need access to data that you do not own or manage
- **Business Verification** - is required for all apps making requests for Advanced Access
- If your app requests permission to use an endpoint to access an app user's data, you may need to complete data handling questions.
- You may also be required to complete an annual Data Use Checkup.

## Ways to ask for a permission

When your app users log onto your app, they receive a request to grant the permissions your app has requested. Your app users can grant or deny the requested permissions or any subset of them.

- Facebook Login
- Facebook Login for Business
- Instagram API with Facebook Login for Business
- Instagram API with Business Login for Instagram
- Meta Business Manager

If your app does not use a permission for 90 days, usually due to user inactivity, your app user must regrant your app that permission.

## Remove a permission

You can use the Meta App Dashboard to remove a permission your app no longer uses or to remove a permission that has been deprecated.

---

Permission Description and allowed usage What to include in App Review submission
ads_management The ads_management permission allows your _ Provide specific examples of why your app
app to both read and manage the Ads account it requires managing ads on behalf of other
owns, or has been granted access to, by the Ad _ businesses.
account owner. The allowed usage for this Screencast Requirements
Dependencies permission is to programmatically create 1, Demonstrate the complete Facebook
pages read engage campaigns, manage ads or fetch Ad metrics to login process on your app platform,
eine help their business. Additionally, it can also be showing how your app user grants your
pages_show_list used to build ad management tools to provide app this permission.
innovative solutions and differentiated values 2. Demonstrate how a business can access
for advertisers. ads performance data on your app
platform after granting the permission.
Allowed Usage 3. Showcase that the ads performance
manage ads, and fetch metrics. Spend, Clicks, and Reach, are displayed

+ Build ad management tools that provide successfully on your app platform.
innovative solutions and differentiated
value for advertisers.

ads_mcp_management The ads_mep_management permission allows se Case Description
your app to access the Meta ads Model Context provide specific examples of why your app
Protocol (MCP) server and enable Al agents to requires access to Meta's ads MCP server to
interact with Meta Ads on behalf of advertisers. manage campaigns and business assets on
Dependencies The allowed usage for this permission is to behalf of other businesses.
interact with the Meta ads MCP server to create
None ‘ 2 ‘a 4 Screencast Requirements
Cn TIS EU a Se IMIE Dd 1. Demonstrate the complete Facebook
insights and reports, and manage business .
login process on your app platform,
assets like catalog, ad accounts, and pixels. _
showing how your app user grants your
The allowed usage for this permission is to : ery
‘ : app this permission.
programmatically create campaigns, manage 2. Demonstrate connecting the ads MCP
ads or fetch Ad metrics to help their business. . .
server to an MCP client to discover
Additionally, it can also be used to build ad .
nae . available tools.
bis ell ee A ye UN nS 3. Use the MCP client to perform at least
solutions and differentiated values for i a
one read operation, such as retrieving
advertisers. ; inch
campaigns or performance insights, from
an ad account.
Allowed Usage 4. Use the MCP client to perform at least

+ Use ads MCP to create, edit, and ‘one write operation, such as creating or
manage ad campaigns. editing a campaign or product catalog.

+ Use ads MCP to retrieve performance
insights and reporting data.

+ Use ads MCP to create and manage
product catalogs and other business
assets.

ads_read The ads_read permission allows your app to Provide specific examples of why your app
access the Ads Insights API to pull Ads report requires accessing ads and related statistics on
information for Ad accounts you own or have behalf of other businesses.
been granted access to by the owner or owners Screencast Requirements
Dependencies of other ad accounts through this permission. 1. Demonstrate the complete Facebook
None This permissions also grants your app access login process on your app platform,
to the Server-Side API to allow advertisers to showing how your app user grants your
send web events from their servers directly to app this permission.
Facebook. 2. Demonstrate how a business can access
ads performance data on your app
Allowed Usage platform after granting the permission.

«+ Provide API access to your ad 3. Showcase that the ads performance
performance data for use in custom data, such as Impressions, Conversions,
dashboards and data analytics. Spend, Clicks, and Reach, are displayed

+ Send web events from your server successfully on your app platform.
directly to Facebook.

attribution_read The attribution_read permission grants your Use Case Description
app access to the Attribution API to pull Visit the App Review documentation for
attribution report data for lines of business you guidance.
own or have been granted access to by the
Dependencies owner or owners of other lines of business. 5 ” Reaul <9
None Visit the App Review documentation for
Allowed Usage guidance.

+ Provides the ability for your app to
access ads performance data from
Attribution for use in custom dashboards
and data analytics.

## B

Permission Description and allowed usage What to include in App Review submission
business _managemen The business_management permission allows Use Case Description
t your app to read and write with the Business Provide specific examples of why your app
Manager API. The allowed usage for this requires managing business assets on behalf of
Dependencies permission is to manage business assets such —_ ther businesses. If the permission is requested
pages_read_engage| 2s an ad account and to claim ad accounts. as a dependency of another main permission,
ment including pages_messaging or
pages_show_list Allowed Usage pages_show_list, please specify the main
+ Manage business assets such as an ad permission in the use case description.
account.
+ Claim ad accounts. Screencast Requirements

1. Demonstrate the complete Facebook
login process on your app platform,
showing how your app user grants your
app this permission.

2. Demonstrate how a business can access
ads performance data on your app
platform after granting the permission.

3. Showcase that the ads performance
data, such as Impressions, Conversions,
Spend, Clicks, and Reach, are displayed
successfully on your app platform.

## C

Permission Description and allowed usage What to include in App Review submission
catalog management The catalog_management permission allows Use Case Description
your app to create, read, update and delete Provide specific examples of why your app
business-owned product catalogs that the user needs to manage the product catalogs of
Dependencies is an admin of. The allowed usage for this businesses that grant you access.
business_manageme permission is to build commerce-related Screencast Requirements
nt solutions for ecommerce platforms, travel 4. Demonstrate the complete Facebook
platforms and dynamic ads. It can also be used login process on your app platform,
to build inventory type management solutions showing how your app user grants your
like product inventory, hotel inventory or car app this permission.
Seetoy: 2. Demonstrate how your app user creates,
Allowed Usage updates, and deletes a product catalog
+ Build commerce-related solutions like on your app platform
ecommerce platforms, travel platforms
and dynamic ads.
+ Build inventory type management
solutions like product inventory, hotel
inventory or car inventory.
commerce account_m The commerce_account manage_orders Use Case Description
anage_orders permission allows your app to read and update —_visit the App Review documentation for
commerce account orders. guidance.
Allowed Usage
+ Read and update orders in your Screencast Requirements
commerce account. Visit the App Review documentation for
+ Tech providers manage orders on behalf guidance.
of their customers.
+ Access to Webhook notifications.
commerce _account_r The commerce_account_read_orders Use Case Description
ead_orders permission allows your app to read commerce Visit the App Review documentation for
account orders. guidance.
Allowed Usage
+ Read orders in your commerce account. — g¢reencast Requirements
+ Use the buyer's email address for Visit the App Review documentation for
marketing purposes only if a buyer has aia as

opted-in at checkout. mt
commerce _account_r The commerce_account_read_reports Use Case Description
ead_reports permission allows your app to read finance Visit the App Review documentation for
reporting data to build custom tax, cash guidance.
reconciliation and reimbursement reports for a
commerce account. si ri oman
Allowed Usage Visit the App Review documentation for
+ Read finance reporting data in your guidance.
commerce account for building custom
tax cash reconciliation and
reimbursement reports.
+ Tech providers can run finance reports on
behalf of their customers.
commerce _account_r The commerce_account_read_settings Use Case Description
ead_settings permission allows your app to read commerce Visit the App Review documentation for
account settings. guidance.
Allowed Usage
+ Read basic commerce account Screencast Requirements
information like connected channels, Visit the App Review documentation for
shipping options, fulfillment locations, guidance.
connected business, etc.
commerce manage_ac The commerce_manage_accounts Use Case Description
counts permission allows your app to create and Visit the App Review documentation for
manage commerce accounts, such as an guidance.
ecommerce app.
Allowed Usage Screencast Requirements
+ Associate your app with your commerce sit the App Review documentation for
account. guidance.
+ Tech providers create a commerce
account on behalf of their customers.
« Tech providers enable a new sales
channel within their customer's
commerce account.

## E

Permission Description and allowed usage What to include in App Review submission
email The email permission allows your app toread a Yse Case Description
person's primary email address. Visit the App Review documentation for
Allowed Usage guidance.
+ Communicating with people and letting
them log into your app with the email Screencast Requirements
address associated with their Facebook Visit the App Review documentation for
Profile. guidance.

## F

Permission Description and allowed usage What to include in App Review submission
facebook _branded_c The facebook_branded_content_ads_brand = Use Case Description
ontent_ads_brand allows an app to read Facebook posts where Provide specific examples of why your app
the app user's Facebook profile is tagged as 2 requires access to manage Facebook branded
Dependencies paid partner, and an app user to read, request, —_content ad campaigns and access data related
pages_read_engage and revoke permissions to run Partnership Ads. to branded content ads on behalf of other
mae The allowed usage of this functionality is to businesses.

pages show list enable a business to read Facebook posts
where the account is tagged as a paid partner Screencast Requirements
and manage permissions to run Partnership 1. Demonstrate the complete Facebook
Ads without needing a pre-existing post. Login for Business process on your app
Allowed Usage platform, showing how your app user
+ Allow a business to read Facebook posts grants your app this permission.
where the account is tagged as a paid 2. Demonstrate how your app user selects
partner a branded content post and promotes the
+ Manage permissions to run Partnership post as an ad on your app platform.
Ads without needing a pre-existing post
facebook_creator_m The Use Case Description
arketplace discove facebook_creator_marketplace_discovery Provide specific examples of why your app
ry permission allows an app to discover content requires managing Facebook creator discovery
creators on Facebook's creator discovery on behalf of other businesses.
platform. The allowed usage for this permission
is for Facebook businesses to retrieve insights Screencast Requirements
data for eligible Facebook creators in order to 1. Demonstrate the complete Facebook
Dependencies discover and evaluate them for brand login process on your app platform,
pages_show list campaigns, and to credit and pay creators for showing how your app user grants your
their Facebook presence. app this permission.
Allowed Usage 2. Demonstrate how to search for Creators
+ Retrieve insights data for eligible ‘on the Facebook Creator Discovery
Facebook creators in order to discover platform, and highlight how to access
and evaluate them for brand campaigns insights on the Creators such as creator
+ To credit and pay creators for their bio, follower count, and account reach.
Facebook presence 3. Demonstrate how you intend to use the
insights data you have obtained in line
with permitted purposes and showing
compliance with all applicable data usage
and privacy policies.

## G

Permission Description and allowed usage What to include in App Review submission
gaming_user_locale The gaming_user_locale permission allows Use Case Description
your app to get a user's preferred language Visit the App Review documentation for
Dependencies while the user plays a game on Facebook (for guidance.
gaming_profile example, Instant Games or Cloud Gaming). The
allowed usage for this permission is to display a Si t Requit
game interface in the user's preferred language. Visit the App Review documentation for
guidance.
Allowed Usage
+ Display a game interface in the user's
preferred language.
1
Permission Description and allowed usage What to include in App Review submission
instagram_basic The instagram_basic permission allows your Use Case Description
app to read an Instagram account profile's info include the specific Professional Instagram
and media. The allowed usage for this Account profile information your use case will
Dependencies permission is to get basic metadata of an require. Describe where this information can be
pages_read_user_c__ Instagram Business account profile, for found within your solution.
ontent example username and ID.
pages_show_list Allowed Usage Screencast Requirements
+ Get basic metadata of an Instagram 1, Demonstrate the complete Facebook
Business account profile, for example login process on your app platform,

aa aa a showing how your app user grants your
app this permission.

2. Demonstrate the complete Facebook
login process on your app platform,
showing how your app user grants your
app this permission and selects their
Instagram account

instagram_branded_ The instagram_branded_content_ads_brand Use Case Description
content_ads brand __ permission allows an app to read Instagram Provide specific examples of why your app
Posts where the app user's Instagram account —_ requires accesss to manage Instagram branded
is tagged as a paid partner, and an app user to content ad campaigns and access data related
Dependencies read, request, and revoke permissions torun —_tg branded content ads on behalf of other
instagram basic Partnership Ads. The allowed usage of this businesses.
pages _read_ engage functionality is to enable a business to read
ene Instagram posts where the account is tagged as f Requi
pages: show list ||| 2 bald batinet and manage permissions to run 1. Demonstrate the complete Facebook
Partnership Ads without needing a pre-existing .
login process on your app platform,
post showing how your app user grants your
Allowed Usage app this permission.
+ Read Instagram posts where the account 2. Demonstrate how your app user selects
is tagged as a paid partner a branded content post and promotes the
+ Manage permissions to run Partnership post as an ad on your app platform.
Ads without needing a pre-existing post
instagram_branded_ The instagram_branded_content_brand Use Case Description
content_brand permission allows your app to add, remove and provide specific examples of why your app
view creators from a specific brand's approved —_ requires access to manage Instagram branded
creators list. The allowed usage for this content ad campaigns and access data related
Dependencies pegnission'|s te yanage aispeceic rand: to branded content ads on behalf of other
instagram_basic Instagram creator content settings. businesses.
pages_read_engage Allowed Usage
ment + Manage branded creator content settings — screencast Requirements
pages_show_list on a business’ Instagram account. 1. Demonstrate the complete Facebook
login process on your app platform,
showing how your app user grants your
app this permission.

2. Demonstrate how your app user adds,
removes, and views creators from a
brand's approved creators list on your
app platform

instagram_branded_ The instagram_branded_content_creator Use Case Description
content_creator permission allows your app to read and change provide specific examples of why your app
the boost status of a creator's specific piece of requires accesss to manage Instagram branded
content. The allowed usage for this permission —_ontent ad campaigns and access data related
Dependencies is to manage Instagram creator content to branded content ads on behalf of other
instagram basic settings. businesses.
pages_read_engage Allowed Usage
ment + Read Instagram posts where the account — creencast Requirements
pages_show_list is tagged as a paid partner 1. Demonstrate the complete Facebook
+ Manage permissions to run Partnership login process on your app platform,
Ads without needing a pre-existing post showing how your app user grants your
app this permission.

2. Demonstrate how your app user selects
a branded content post and promotes the
post as an ad on your app platform.

instagram_ business The instagram_business_basic allows your Use Case Description
_basic app to read an Instagram Business account Provide specific examples of why your app
profile's info and media. The allowed usage for requires the instagram_business_basic
Dependencies this permission is to get basic metadata of an permission to access basic metadata of
None Instagram Business account profile, for Instagram Business account profiles on behalf
example username and ID. of other businesses.
5 a Yaa

ee ee
+ Get basic metadata of an Instagram Screencast Requirements
Business account profile 1. Demonstrate the complete Instagram
login process on your app platform,
showing how your app user grants your
app this permission
2. Demonstrate getting basic metadata,
such as the username and ID, of an
Instagram Business account profile on
your app platform
instagram_ business The instagram_business_content_publish Use Case Description
_content_publish permission allows an app to create organic feed provide specific examples of why your app
photo and video posts on behalf of a business requires the
user. The allowed usage of this permission is to instagram business_content_publish
Dependencies allow an app to manage the organic content permission to create and publish organic feed
instagram_busines Creation process for Instagram (for example, —_ photo and video posts on behalf of other
B basic post photos and videos) on behalf of an businesses.
= Instagram business account.
Ae ESTO Screencast Requirements
+ Manage the organic content creation 1. Demonstrate the complete Instagram
process for Instagram (for example, post login process on your app platform,
Photos and videos) on behalf of an showing how your app user grants your
Instagram business account app this permission
2. Demonstrate creating a new organic feed
photo post on behalf of a business user
3. Show how to add a caption, hashtags,
and other metadata, and post to the
business user's Instagram feed
instagram_business The instagram_business_content_publish Use Case Description
_Manage_comments permission allows an app to create organic feed — provide specific examples of why your app
photo and video posts on behalf of a business requires the
user. The allowed usage of this permission is to instagram business manage_comments
Dependencies allowran'app:to nanage:tie organic content permission i manage Instagram eanmenscn
instagram busines creation process for Instagram (for example, behalf of other businesses.
spurs post photos and videos) on behalf of an
= Instagram business account. s t Requi
Allowed Usage 1. Demonstrate the complete Instagram
+ Manage the organic content creation login process on your app platform,
process for Instagram (for example, post showing how your app user grants your
photos and videos) on behalf of an app this permission
Instagram business account 2. Demonstrate creating a new comment,
updating an existing comment and
deleting a comment
3. Show how this appears both in your app
and the native Instagram app
instagram business The Use Case Description
_manage_messages instagram_business_manage_messages Explain the messaging functionality your app
permission allows an app to access messages —_ offers to business customers who are
on an Instagram professional account. The onboarded onto the platform, and describe how
Dependencies allowed usage for this permission is to view, they perform these functions.
instagram busines manage and respond to messages, and to use 5 Requit
s basic third-party customer relationship management 4. Demonstrate the complete Instagram
GM) oo to malaga Messages: login process on your app platform,
Allowed Usage showing how your app user grants your
+ View, manage, and respond to messages app this permission
« Use third-party customer relationship 2. Demonstrate your app sending a
management (CRM) tools to manage message to an Instagram user, and
messages demonstrate the Instagram inbox client
(either web or mobile app) receiving and
displaying the sent message
3. Demonstrate generating a cURL request
that you can integrate into your app

Platiorm to send a message, You May
use the API Integration Helper in Meta
App Dashboard > Instagram to do this
instagram_creator_ The Use Case Description
marketplace discov  instagram_creator_marketplace_discovery Provide specific examples of why your app
ery permission allows your app to discover content requires managing
creators on Instagram Creator Marketplace andj ,stagram creator marketplace disco
access insights like creator bio, follower count, very on behalf of other businesses.
Dependencies and account reach for Instagram businesses
. j onboarded to the platform. The allowed usage a
pa for this permission is for Instagram businesses Sorpencent Seqairomet®,
gement 1. Demonstrate the complete Facebook
: onboarded to the Creator Marketplace to i
° instagram_ba i ee ng login process on your app platform,
wie retrieve Peete data eligible Instagram showing how-your-app user grants’ your
creators, like creator bio, follower count, and ‘ ie
* pages_manage app this permission.
account reach.
metadata 2. Demonstrate how to search for Creators
+ pages show 1 Allowed Usage on Instagram Creator Marketplace, and
ist esis ii si highlight how to access Insights on the
Instagram creators, like creator bio, Creators such as creator bio, follower
follower count, and account reach. count, and account reach.
instagram_creator_ The Use Case Description
marketplace _messag  instagram_creator_marketplace_messaging provide specific examples of why your app
ing permission allows your app to get a brand's requires managing instagram creator
Partnership conversations and a creator's marketplace messages on behalf of other
messaging ID used for partnership messages. businesses.
Dependencies The allowed usage for this permission is for
+ instagram basic brands on the Instagram creator marketplace to Screencast Requirements
h pages. read aser_c| | 7 Paid parnerenip messages 10 creators. 1. Demonstrate the complete Facebook
ontent Allowed Usage Login for Business process on your app
*|pages_show_list + Allows brands on the Instagram creator platform, showing how your app user
marketplace to send paid partnership grants your app this permission.
messages to creators. 2. Demonstrate how to retrieve partnership
conversations and messages.
instagram_content_ The instagram_content_publish permission Use Case Description
publish allows your app to create organic feed photo Provide specific examples of why your app
and video posts on behalf of a business user. requires the instagram_content_publish
The allowed usage for this permission Is to permission to create and publish organic feed
Dependencies mnanage yous Inetepear organic concent photo and video posts on Instagram on behalf
instagram_basic creation process, for example post photos or of other businesses.
pages_read_engage videos to a main feed, on behalf of a business.
ment Allowed Usage Screencast Requirements
pages_show list + Managing organic content creation 1. Demonstrate the complete Facebook
process for Instagram (for example, post login process on your app platform,
pnotoslancivideosite nalniteex) or showing how your app user grants your
behalf of a business. app this permission.

2. Demonstrate creating a new photo post
and publish the post to the business
user's Instagram feed

instagram_manage_c The instagram_manage_comments Use Case Description
omments permission allows your app to create, delete Provide specific examples of why your app
and hide comments on behalf of the Instagram requires the instagram_content_publish
account linked to a Page. Your app can also permission to create and publish organic feed
Dependencies read and respond to public media and photo and video posts on Instagram on behalf
instagram_basic comments that a business has been photo of other businesses.
pages_read_engage tagged or @mentioned in. The allowed usage
ane for this permission is to read, update and delete Screencast Requirements
pages_show_list comments of Instagram Business Accounts. 4. Demonstrate the complete Facebook
Allowed Usage login process on your app platform,
+ Read, update and delete comments of showing how your app user grants your
Instagram Business accounts. app this permission.
2. Demonstrate creating a new photo post

and publish the post to the business
user's Instagram feed
instagram_manage_c The instagram_manage_contents permission Use Case Description
ontents allows your app to delete posts on behalf ofan provide specific examples of why your app
Instagram account linked to a Facebook Page. requires the instagram_manage_contents
The allowed usage for this permission is to permission to delete an app user's Instagram
Dependencies allow an app user to delete an Instagram post, media.
instagram_basic story or reel.
Allowed Usage Screencast Requirements
+ Delete an Instagram post, story or reel. 1. Demonstrate the completed Facebook
Login for Business process on your app
platform, showing how a business grants
your app the
instagram_manage_contents
permission.
2. Demonstrate deleting Instagram media
from the business user's Instagram feed.
instagram_manage_e The instagram_manage_engagement Use Case Description
ngagement Permission allows your app to publish or delete —_ provide specific examples of why your app
a"Like" on IG Media objects, Feed or Reels, requires the
and IG Comment objects, Comment or Reply, instagram manage engagement
Dependencies on behalf of an Instagram account linked to permission to publish or delete an app user's
Hitae tage meas te mee occucoK tage ie allied Usage ton thls) “Like” on IG Media objects (Feed, Reels) and IG
+ pages _read_user_c permission is to allow an app user to publish or ~~ Comment objects (Comment, Reply).
encent delete a "Like" on IG Media objects, Feed or
* pages_show list Reels, and IG Comment objects, Comment or RScreancaet terrerents
Reply 1. Demonstrate the completed Facebook
Allowed Usage Login for Business process on your app
+ Publish or delete a "Like" on IG Media platform, showing how a business grants
objects, Feed or Reels your app the
+ Publish or delete a "Like" on IG Comment Get acraatmansee sngaueneat
objects, Comment or Reply permission.
2. Demonstrate publishing or deleting a
"Like" Instagram media from the business
user's Instagram feed.
3. Demonstrate publishing or deleting a
"Like" on Instagram Comment objects.
instagram_manage_e The instagram_manage_events permission Use Case Description
vents allows an app permission to log events (€.g., Provide specific examples of why your app
purchase, add-to-cart, leads) on behalf of requires the
Instagram accounts administered by the app's instagram_manage_upcoming_events
Dependencies users. The allowed usage for this permission is permission to manage upcoming events on
instagram basic 'log events on Instagram accounts and send —_ingtagram on behalf of other businesses.
pages_read_engage this activity data to Meta for ads targeting,
pant: optimization and reporting; and to provide aad ecuinarents
pages_show_list marketing and advertising analytics insights. 1. Demonstrate the complete Facebook
Allowed Usage login process on your app platform,
+ Log events on Instagram accounts and showing how your app user grants your
send this activity data to Meta for ads app this permission.
targeting, optimization and reporting 2. Demonstrate retrieving a list of upcoming
+ Provide marketing and advertising events and demonstrate how to view
analytics insights event details
3. Create a new event and demonstrate
how to add event details such as title,
date, time, and location
instagram_manage_i The instagram_manage_insights permission Use Case Description
nsights allows your app to get access to insights for the provide specific examples of why your app
Instagram account linked to a Facebook Page. —_ requires the instagram_manage_insights
Your app can also discover and read the profile permission to provide insights into Instagram
Dependencies info and media of other business profiles. The performance on behalf of other businesses.

instagram_basic MOWES USAZe FOF US PENTESSION IS (0 Yer
pages_read_engage metadata, data insights and story insights of an t Requi
ment LEE ee eeeertt 41. Demonstrate the complete Facebook
pages_show_list Allowed Usage login process on your app platform,

+ Get metadata of an Instagram Business showing how your app user grants your

account. app this permission.

+ Get data insights of an Instagram 2. Demonstrate getting insights for the app

Business account. user's Instagram professional account
+ Get story insights of an Instagram metadata, posts, photos, and videos
Business account. 3. Demonstrate getting insights for an
Instagram professional account's public
profile metadata and media on behalf of
the app user's Instagram professional
account
instagram_manage_m The instagram_manage_messages Use Case Description
essages permission allows business users to read and Explain the messaging functionality your app
respond to Instagram Direct messages. The offers to business customers who are
allowed usage for this permission Is for onboarded onto the platform, and describe how
Dependencies businesses to retrieve threads and messages they perform these functions.
instagram basic from its Instagram Direct inbox, manage ast Requi
pages_read_engage messages with their customers or to use third- 41. Demonstrate the complete Facebook
esa party customer relationship management login process on your app platform,
pages_show_list (CRM) tools to manage its Instagram Direct showing how your app user grants your
mbox: app this permission.
Allowed Usage 2. Demonstrate your app sending a

+ Business that want to retrieve threads message to an Instagram user, and

and messages from its Direct inbox. demonstrate the Instagram inbox client

+ Business that want to manage messages (either web or mobile app) receiving and

with their customer. displaying the sent message

+ Business that want to use third-party 3. Generate a cURL request that you can

customer relationship management integrate into your app platform to send a
(CRM) tools to manage its IG Direct message; You may use the API
inbox. Integration Helper in Meta App
Dashboard > Instagram to do this
4. Make sure it is a recording of the
message being sent from the app to the
user, instead of sharing screenshots of
messages received on Instagram inbox
client
instagram_shopping The instagram_shopping_tag_products Use Case Description
_tag_products permission allows an app to tag Instagram Provide specific examples of why your app
media with product tags and appeal product requires the
rejections. The allowed usage for this instagram shopping tag products
Dependencies functionality is to check eligibility for product permission to tag Instagram media with product
instagram_basic tagging, get catalogs and products, tag media tags and manage the product catalog on behalf
pages_read_engage with product tags, manage existing product tags oF other businesses.
oer and appeal product rejections.
pages_show_list Allowed Usage Screencast Requirements

+ Check eligibility for product tagging 1. Demonstrate the complete Facebook

+ Get catalogs and products login process on your app platform,

+ Tag media with product tags showing how your app user grants your

+ Manage existing product tags app this permission.

+ Appeal product rejections 2. Demonstrate retrieving a list of available
catalogs and products and demonstrate
how to select one

3. Tag a piece of media with a product tag
instagram_manage_u The instagram_manage_upcoming_events Use Case Description
pcoming_events permission allows an app to read, create, and Provide specific examples of why your app
update upcoming events on behalf of Instagram requires the
accounts administered by people using the app. instagram_manage_upcoming_events
Dependencies The allowed usage for this permission is to permission to manage upcoming events on
instagram_basic manage upcoming events on Instagram Instagram on behalf of other businesses.

PAGES FARE engage | cc eceermrirentnd unt neater ae ni:
ment SPR: Screencast Requirements
pages_show_list Allowed Usage 1. Demonstrate the complete Facebook
+ Manage upcoming events on Instagram login process on your app platform,
accounts administered by the people showing how your app user grants your
using the app app this permission.

2. Demonstrate retrieving a list of upcoming
events and demonstrate how to view
event details

3. Create a new event and demonstrate
how to add event details such as title,
date, time, and location

## L

Permission Description and allowed usage What to include in App Review submission
leads_retrieval The leads_retrieval permission allows your Use Case Description
app to retrieve and read all information captured provide specific examples of why your app
by a lead ads form associated with an ad needs to access leads for the pages that grant
Dependencies created in Ads Manager or the Marketing API. you access.
Ads Management The allowed usage for this permission is to Si t Requit
i eeeeneniaeaenaeinaien Sontact peofte wie completed yourlead 2d Visit the App Review documentation for
ads_management form requesting more information. This guidance.
ade gna permission can also be used by advertiser
a ae manayeme authorized CRM platforms to pull the lead data
-_ on behalf of the advertisers.
pages_manage_ads Allowed Usage
pages read engage + Reach out to the people who followed up
want your lead ad form requesting more
pages show list information. For example, an auto dealer
reaching out to a potential customer
(lead) that responded to their ad with
quotes for a car.
+ For advertiser authorized CRM platforms
to pull the lead data on behalf of the
advertisers. These advertisers can then
use the lead information to reach out to
the user.

## M

Permission Description and allowed usage What to include in App Review submission
manage_app_solutio The manage_app_solution permission allows —_ Use Case Description
ns an app to get a list of apps that a user can Visit the App Review documentation for
manage, and make API calls on behalf of those — guidance.
apps. The allowed usage for this permission is
to let a business create and manage partner Ss t Requi
solutions between Tech Providers and Solution ‘ 4 i
Visit the App Review documentation for
Partners. guidance.
Allowed Usage
+ Leta business create and manage
partner solutions between Tech Providers
and Solution Partners
manage fundraisers The manage_fundraisers permission allows Use Case Description
an app to create, update, and read a fundraiser isit the ‘App Review documentation for
and its donations on behalf of a user. guidance.
Allowed Usage
« Help fundraiser creators to expand their yf NG SES pl NEM pa a

is ae ie ham Reametauenen ried ninin, eeusaion ween wea’
Teach on Facebook. Visit the App Review documentation for
+ Sync the amount raised displayed onthe — guidance.
fundraiser's website and the linked
Facebook fundraiser.
marketing_messages The marketing_messages_messenger Use Case Description
_Messenger permission allows an app to create, manage, Provide specific examples of why your app
and send paid marketing messages on requires the
Messenger and to view the performance of marketing messages_messenger
Dependencies these marketing messages campaigns on permission to access Marketing Messages
* ads manageme behalf of the app user using their authorized Ad endpoints on Messenger
ne Accounts. The allowed usage for this
* pages _messag permission is to allow an app user, such as a Ss t Requi nea
ee business, to send paid marketi
ang peel aca a kN 1. Demonstrate the complete Facebook
Messenger to people who have chosen to fee 7
5 ji gin for Business process on your app
receive announcements and promotional ‘
platform, showing how your app user
messages from specific Facebook Pages i" woe
fr Bia SB kar grants your app this permission.
ei PP . 2. Demonstrate how your app user selects
Allowed Usage the Pages and Ad Accounts on your app
+ Send paid marketing messages on platform; and
Messenger to people who have chosen 3. The process of agreeing to the Marketing
to receive announcements and Messages Beta ToS for those assets.
promotional messages 4. Demonstrate the ability to create and
send marketing messages messenger.
Pp
Permission Description and allowed usage What to include in App Review submission
pages_events The page_events permissions allows your app —_ Use Case Description
permission to log events on behalf of Facebook _isit the App Review documentation for
Pages administered by people using your app guidance.
Dependencies and to send those events to Facebook for ads
pages show list targeting, optimization and reporting. The t Requit nes
lowed for thi ission is t id
brits ch idea place ta Visit the App Review documentation for
businesses related activities (for example P
guidance.
purchase, add-to-cart, lead) on behalf of Pages
owned by the people who use your app.
Allowed Usage
+ Send businesses related activities (for
example purchase, add-to-cart, lead) on
behalf of Pages owned by the people
who use your app.
pages_manage_ads The pages_manage_ads permission allows Use Case Description
your app to manage ads associated with the Provide specific examples of why your app
Page. The allowed usage for this permission is requires creating and managing ads on behalf
Dependencies to create and manage ads for the Page, or ads_—_of other businesses for their pages.
pages show list that click to a business messaging surface, - t Requi
such as Messenger, Instagram Direct, or
9 9 1. Demonstrate the complete Facebook
WhatsApp, associated with a Page.
login process on your app platform,
Allowed Usage showing how your app user grants your
+ Create ads for your Page. app this permission.
+ Manage ads for your Page. 2. Demonstrate how your app user creates
+ Create and manage ads that click toa an ad for their Facebook Page on your
business messaging surface. app platform
3. Showcase that the ads are created
successfully on the page
pages_manage_cta The pages_manage_cta permission allows Use Case Description
your app to carry out POST and DELETE Visit the App Review documentation for
functions on endpoints used to manage call-to-  qiidance

action buttons on a Facebook Page. -
Allowed Usage Screencast Requirements
+ Provide API access to manage call-to- —_isit the App Review documentation for
action buttons on Pages that you guidance.
manage.
pages_manage_ insta The pages_manage_instant_articles Use Case Description
nt_articles permission allows your app to manage Instant Visit the App Review documentation for
Articles on behalf of Facebook Pages guidance.
administered by people using your app. The
Dependencies allowed usage for this permission is to create t Requit
pages show list and update Instant Articles for Pages owned by Visit the App Review documentation for
the people who use your app. guidance.
Allowed Usage
+ Create and update Instant Articles for
Pages owned by the people who use
your app.
pages_manage_engag The pages_manage_engagement permission Use Case Description
ement allows your app to create, edit and delete Provide specific examples of why your app
comments posted on the Page. The allowed needs to manage comments on behalf of other
usage for this permission is to help manage and users on the pages they own.
Dependencies moderate content on the Page. Screencast Requirements
pages_read_user_c Allowed Usage 1. Demonstrate the complete Facebook
ontent + Publish a comment on a Page post. login process on your app platform,
pages_show_list + Update your comment on a Page post. showing how your app user grants your
+ Delete a comment on a Page post. app this permission.
+ Like a Page post or remove your Like 2. Demonstrate how your app user
from a Page post. publishes a comment on their Facebook
Page on your app platform
3. Show the newly published comment on
the app user's page
pages_manage_metad The pages_manage_metadata permission Use Case Description
ata allows your app to subscribe and receive Provide specific examples of why your app
webhooks about activity on the Page, and to needs to manage accounts, settings, or
update settings on the Page. The allowed webhooks for a page on behalf of other users
Dependencies usage for this permission is to help a Page who own the page(s).
pages_show list Admin administer and manage a Page. Screencast Requirements
Allowed Usage 1. Demonstrate the complete Facebook
+ Subscribe to receive webhooks of your login process on your app platform,
Page. showing how your app user grants your
+ Update settings of your Page. app this permission.

2. Demonstrate how your app user
subscribes to webhook events or updates
the settings of their Facebook Page on
your app platform

pages_manage_posts The pages_manage_posts permission allows —_ ge Case Description
your app to create, edit and delete your Page Provide specific examples of why your app
Dependencies posts. The allowed usage for this permission is needs to create or manage posts on behalf of
pages_read_engage to create and delete content on a Page. other users for the pages they own.
ment Allowed Usage Screencast Requirements
pages_show_list + Publish a post, photo, or video to your 1, Demonstrate the complete Facebook
Page. login process on your app platform,
+ Update a post, photo, or video on your showing how your app user grants your
Page. app this permission.
+ Delete a post, photo, or video on your 2. Demonstrate how your app user creates,
Page. edits, and deletes a post on their
Facebook Page on your app platform

3. Showcase the newly updated post on

their page

pages_messaging The pages_messaging permission allows your Use Case Description
app to manage and access Page conversations provide specific examples of why your app
and calling in Messenger. The allowed usage requires creating and managing ads on behalf
Dependencies for this permission is to create user-initiated of other businesses for their pages.
pages_manage_meta interactive experiences, send customer support Screencast Requi
data messages, confirm bookings or purchases and 4. Demonstrate the complete Facebook
pages_show_list orders, and facilitate calls between a business login process on your app platform,
CORE ce showing how your app user grants your
Allowed Usage app this permission.
+ Create interactive experiences initiated 2. Demonstrate one of the following:
by a user. + Demonstrate receipt of inbound
+ Confirm customer interactions such as calls from customers or
purchases, orders and bookings. Demonstrate outbound calls to.
+ Send customer support messages. customers; or
+ Handle inbound and outbound calls + Demonstrate your app sending a
between businesses and customers. message to a Messenger user,
and demonstrate the Messenger
inbox client (either web or mobile
app) receiving and displaying the
sent message.

+ Generate a CURL request
that you can integrate into
your app platform to send a
message; You may use the
API Integration Helper in
Meta App Dashboard >
Messenger to do this.

+ Make sure it is a recording
of the message being sent
from the app to the user,
instead of sharing
screenshots of messages
received on Messenger
client.

pages_read_engagem The pages_read_engagement permission Use Case Description
ent allows your app to read content (posts, photos, — provide specific examples of why your app
videos, events) posted by the Page, read needs to read content posted on behalf of other
followers data (including name, PSID), and users for the pages they own.
Dependencies profile picture, and read metadata and other t Requit
pages_show_list insights about the Page. The allowed usage for 1. Demonstrate the complete Facebook
this permission is to help a Page Admin login process on your app platform,
eeninistes.anchimansge:a29°. showing how your app user grants your
Allowed Usage app this permission.
+ Get content posted by your Page. 2. Demonstrate how your app user
+ Get names, PSIDs, and profile pictures of accesses a post's content on their
your Page followers. Facebook Page on your app platform
+ Get metadata about your Page. 3. Showcase that the post content is
successfully displayed on your app
platform
pages_read_user_co The pages_read_user_content permission Use Case Description
ntent allows your app to read user generated content —_ provide specific examples of why your app
on the Page, such as posts, comments, and needs to read user-generated content on behalf
ratings by users or other Pages, and to delete of your app users for the pages they own.
Dependencies user comments on Page posts. The allowed 5 t Requi
pages_show list usage for this permission is to read user's and 4. Demonstrate the complete Facebook
other Page's content posted on the Page if you login process on your app platform,
CES SINCOS DEED showing how your app user grants your
Allowed Usage app this permission.
+ Get user generated content on your 2. Demonstrate how your app user reads a
Page. user-generated comment on their
+ Get posts that your Page is tagged in. Facebook Page on your app platform
+ Delete comments posted by users on 3. Showcase that the user-generated
your Page. comment is successfully displayed on
your app platform

pages_show_list The pages_show_list permission allows your Use Case Description
app to access the list of Pages a person Provide specific examples of why your app
Dependencies manages. The allowed usage for this needs to access the list of pages that a user
None permission is to show a person the list of Pages owns. If the pages_show_list permission
they manage and verify that a person manages _—_ jg requested as a dependency of another main
a Page. permission, please specify the main permission
Allowed Usage in the use case description.
+ Show a person the list of Pages they
manage. Screencast Requirements
+ Verify that a person manages a Page. 1. Demonstrate the complete Facebook
login process on your app platform,
showing how your app user grants your
app this permission.

2. Showcase that the pages owned by the
user are successfully connected with
your app platform.

pages_user_gender | The pages_user_gender permission allows Use Case Description
your app to access a user's gender through the Visit the App Review documentation for
Page your app is connected to. guidance.
Allowed Usage
+ Personalize experiences or Screencast Requirements
recommendations based on gender. Visit the App Review documentation for
+ Use gendered language such as correct guidance.
pronouns and titles.
pages_user_locale The pages_user_locale permission allows Use Case Description
your app to access a user's locale through the —_sit the App Review documentation for
Page your app is connected to. guidance.
Allowed Usage
+ Personalize experiences based on the Screencast Requirements
locale of a person by surfacing locale Visit the App Review documentation for
specific content. guidance.
+ Send responses in the preferred
language of the person.
+ Display numbers, times, and dates
correctly for the locale of the person.
pages_user_timezon The pages_user_timezone permission grants se Case Description
e your app access to a user's time zone through Visit the App Review documentation for
the Page your app is connected to. guidance.
Allowed Usage
+ Prevent messages from being sent atan screencast Requirements
Inconvenient time. Visit the App Review documentation for
+ Send time sensitive content or recurring guidance.
news at a specific time.
+ Provide tailored content based on time.
+ Send time appropriate greetings.
pages_utility mess The pages_utility_messaging permission Use Case Description
aging allows an app to access a Page's utility Visit the App Review documentation for
messaging templates. The allowed usage for guidance.
this permission is to manage a Page's utility
messaging templates and send a Page's utility Ss ast Requi eta
messages through Messenger. Visit the App Review documentation for
Allowed Usage guidance.
+ Manage a Page's utility messaging
templates
+ Send a Page's utility messages through
Messenger
paid marketing mes The paid_marketing messages permission ties Pam imei:

sages allows an app to create, manage, and send paid visit the App Review documentation for
marketing messages on Messenger and to view guidance.
the performance of these marketing messages
campaigns on behalf of the app user. The S ast Requirements
allowed usage for this permission is to allow an Visit the App Review documentation for
app user, such as a business, to send paid guidance.
marketing messages on Messenger to people
who have chosen to receive announcements
and promotional messages from the app user.
Allowed Usage
+ Send paid marketing messages on
Messenger to people who have chosen
to receive announcements and
promotional messages
public profile The public_profile permission allows an app to Use Case Description
read the Default Public Profile Fields on the Visit the App Review documentation for
Dependencies User node. This permission is automatically guidance.
None granted to all apps. The allowed usage for this
permission is to authenticate app users and s t Requit
provide ahem witha personalized In-app Visit the App Review documentation for
experience. guidance!
Allowed Usage
+ Authenticate app users and provide them
with a personalized in-app experience.
publish_video The publish_video permission allows your app Use Case Description
to publish live videos to an app user's timeline, Visit the App Review documentation for
Dependencies group, event or Page. The allowed usage for guidance.
None this permission is to live-video stream to an app
user's timeline, event or Page. et Rage
Allowed Usage Visit the App Review documentation for
+ Grants an app permission to live-video guidance.
stream to an app user's timeline, group,
event or Page.

## R

Permission Description and allowed usage What to include in App Review submission
read_audience_netw The read_audience_network_insights Use Case Description
ork_insights permission allows an app to access the Visit the App Review documentation for
Audience Network insights data and pull guidance.
performance report information for properties
Dependencies you own. The allowed usage for this permission Si t Requi
None is to integrate Audience Network properties Visit the App Review documentation for
performance data into app owner's data ‘
analytics and dashboards. aan:
Allowed Usage
«+ Integrate Audience Network properties
performance data into app owner's data
analytics and dashboards
read_insights The read_insights permission allows your app Use Case Description
to read the Insights data for Pages, apps and Provide specific examples of why your app
web domains the person owns. needs to access Page insights on behalf of your
Allowed Usage app users for the pages they own.
Dependencies + Integrate Facebook's app, page or Screencast Requirements
pages_read_engage domain insights into your own analytics 1. Demonstrate the complete Facebook
ment tools. login process on your app platform,
pages_show_list showing how your app user grants your
app this permission.

2. Demonstrate how your app user retrieves
insight metrics from their Facebook Page
on your app platform

3. Showcase that the insight metrics are
successfully displayed on your app
platform

PT
Permission Description and allowed usage What to include in App Review submission
threads_basic The threads_basic permission allows an app Use Case Description
to get a user's Threads profile information and Provide specific examples of why your app
the media and text content that they posted to requires the threads_basic permission to
Threads. The allowed usage for this permission access a user's Threads profile information and
is to display a user’s own Threads posts within media and text content posted to Threads.
a business app, and make these visible only to
the user who created them. s Fiisineineids
Allowed Usage 1. Demonstrate the complete Threads
+ Display a user's own Threads posts OAuth login process on your app
within an app, and make these visible platform, showing how your app user
only to the user who created them for the grants your app this permission
Purpose of managing the user's presence 2. Demonstrate the full flow of linking a
on Threads. Threads account within your application
and show what permissions are being
requested from the user

3. Retrieve a list of the user's own Threads
posts and demonstrate how to view post
details such as text, images, and videos

threads_business_b The threads_business_basic permission Use Case Description
asic allows a business app to fetch the Threads Provide specific examples of why your app
account ID that is associated with an Instagram requires the threads _business basic
account within the Business Portfolio through retrieve the threads user _id during the
matching username. The allowed usage for this creation of ads on Threads.
permission is to retrieve a Threads account ID
to use as the threads_user_id during the t Requit
creation of ads on Threads. It is not intended for
1. Demonstrate the complete Facebook
any other purpose. For example, using iinessscmrememageiem,
threads_business_basic permission in a erawina how yore cen leer grants your
consumer app is strictly prohibited. You may AEDS Sam ae ecstasy
also use this permission to request analytics Golitkrenessmcemeata
insights to improve your app and for marketing een
eet sce Late 2. Demonstrate how your app user creates
aggregated and de-identified or anonymized “NCHS cremneaPceDeRen
information (provided such data cannot be re-
app platform
identified).
Allowed Usage
+ Retrieve a Threads account ID to use as
the threads_user_id during the creation
of ads on Threads, for the purpose of
managing the user's presence on
Threads.
threads_content_pu_ The threads_content_publish permission Use Case Description
blish allows a business app to create and publish Provide specific examples of why your app
content on behalf of a Threads profile. The requires the threads_content_publish
allowed usage for this permission is to enable a permission to enable users to create and
business app user to create and publish content publish content to their Threads profile.
Dependencies to their Threads profile. You may also use this
threads _basic permission to request analytics insights to aid otusenents
Improve, your app and fos marketing or 1. Demonstrate the complete Threads
advertising purposes, through the use of PO eae eee

aggregated and de-identified or anonymized peony seule Gee ten ieee
information (provided such data cannot be re-
grants your app this permission
Identified): 2. Demonstrate the full flow of linking a
Allowed Usage Threads account within your application
+ Enables an app user to create and and show what permissions are being
publish content to their Threads profile, requested from the user
for the purpose of managing the user's 3. Create a new post and demonstrate how
presence on Threads. to add text, images, or videos
4. Publish the post to the Threads profile
and demonstrate how to view the
published content
5. Show the results of the post creation in
your app and in the native Threads App
threads_delete The threads_delete permission allows an app —_ Use Case Description
to delete an app user's Threads posts. The Provide specific examples of why your app
allowed usage for this permission is to delete an requires the threads_delete permission to
app user's Thread posts. You may also use this gelete an app user's Thread post.
Dependencies permission to request analytics insights to
threads _basic improve your app and for marketing or t Requit
RSE ee Ue ue Ee 1. Demonstrate the complete Threads
aggregated and de-identified or anonymized OAuth lean process on vour app
information (provided such data cannot be re- BEtoT enon ion nen vecrepniisen
Le alues)s grants your app this permission
Allowed Usage 2. Demonstrate the full flow of linking a
+ Delete an app user's Thread posts. Threads account within your application
and show what permissions are being
requested from the user
3. Select a post and demonstrate how to
delete it
4. Confirm that the post has been
successfully deleted
5. Show the results of the post creation in
your app and in the native Threads App
threads_keyword_se The threads_keyword_search permission Use Case Description
arch allows an app to search and fetch content with —_ provide specific examples of why your app
a specific keyword on behalf of a Threads user. requires the threads_keyword_search
The permission also allows for publishing permission to manage your social media
responses to this fetched content. The allowed presence by searching and fetching content
Dependencies usage for this permission is to help the user with specific keywords on Threads.
threads basic manage their social media presence. You may
~ also use this permission to request analytics s t Requi
insights to improve your app and for marketing 4. Demonstrate the complete Threads
or advertising purposes, through the use of OAuth togin process on your app
aggregated and de-identified or anonymized platform, showing how your app user
information (provided such data cannot be re- 7 ba
| . grants your app this permission
Penties): 2. Demonstrate the full flow of linking a
Allowed Usage Threads account within your application
+ Showing public content and the public and show what permissions are being
content tree that a user searches using a requested from the user
specific keyword. 3. Enter a keyword and demonstrate how to
+ Giving the user the ability to sort user's search for public content related to that
own mentioned threads. keyword
+ Giving the user the abllity to publish 4, Show the results of the post creation in
responses to public content that the user your app and in the native Threads App
searches for.
threads_location_t The threads_location_tagging permission Use Case Description
agging allows an app to search for and fetch public Provide specific examples of why your app
locations using specific queries/keywords or requires the threads_location tagging
Roenririiies OF Reta St 6 TG atE aes at permission to enable users to read location
publish media with a location tagged. The information or publish a post with location
Dependencies allowed usage for this permission is to help information
chresdstoasic users tag public locations to their posts and

request locations when media is retrieved. You Screencast Requirements
ay alee use this permission i request 1. Demonstrate the complete Threads
analytics insights to improve your app and for Onancanpeee cere
marketing or advertising purposes, through the platform, showing how your app user
use of aggregated and de-identified or Geninegmenntoncsen
anonymized information (provided such data 2. Demonstrate the full flow of linking a
cannot be retderiited): Threads account within your application
Allowed Usage and show what permissions are being
+ Helps users tag public locations to their requested from the user
Posts and request locations when media 3. Demonstrate Location Information Usage
\s retrieved. 4. Show how to read location information or
publish a post with location information
threads_manage_ins The threads_manage_insights permission Use Case Description
ights allows your app to get access to insights for a Provide specific examples of why your app
Threads profile. The allowed usage for this requires the threads _manage_ insights
permission is to allow your app to get insights permission to track cae penonnanes on
for a Threads profile and for individual threads Threads by providing insights into your profile
Dependencies published by that profile. You may also use this an individual Threads metrics.
threads basic permission to request analytics insights to
- improve your app and for marketing or s ¢ Requirements
Se ee eee 1. Demonstrate the complete Threads
aggregated and de-identified or anonymized OAiith login process on yourpp
information (provided such data cannot be re- pistiorrasf snowing how your apa USE
identified). grants your app this permission
Allowed Usage 2. Demonstrate the full flow of linking a
+ Get insights for a Threads profile Threads account within your application
+ Get insights for individual threads and show what permissions are being
published by that profile requested from the user
3. Retrieve insights data for a Threads
profile and demonstrate how to view
profile-level metrics such as followers,
engagement, and reach
4. Retrieve insights data for an individual
thread and demonstrate how to view
thread-level metrics such as likes,
comments, and shares
threads_manage_men The threads_manage_mentions permission Use Case Description
tions allows an app to fetch content where the user is — provide specific examples of why your app
mentioned in on behalf of a Threads user. The requires the threads _manage_insights
allowed usage for this permission is to help the permission to track your performance on
user manage thelr social media presence, Threads by providing insights into your profile
Dependencies which includes: showing public content and the ang individual Threads metrics.
rireadet asic public content tree that a user is mentioned in,
enabling the user to sort user's own mentioned t Requi
threads, and enabling the user to publish Al Denmrecata ine omnetiiiresds
responses to the public content tree that the OMNES Loe ANEINCED
user is mentioned in. You may also use this Phiten liaise
permission to request analytics insights to Gauci ace
improves your ape and for marketing °F 2. Demonstrate the full flow of linking a
ecverteng purposes, thrount) we use of Threads account within your application
aggregated and de-identified or anonymized ARCEMIS IEC
information (provided such data cannot be re- Pee etemineteey
erted) 3. Retrieve public content where the user is
Allowed Usage mentioned and demonstrate how to view
+» Showing public content and the public the content tree
content tree that a user is mentioned in.
«+ Giving the user the ability to sort user's
own mentioned threads.
+ Giving the user the ability to publish
responses to public content that a user is
mentioned in.
threads_manage_rep The threads_manage_replies permission Use Case Description

dies ee ee ee ee Provide specific examples of why your app
Threads profile, hide or unhide replies to a requires the threads_manage_replies
thread, and control who can reply to a thread on permission to enable users to manage their
the Threads profile. The allowed usage of this Threads presence by creating replies on behalf
Dependencies Permission is to allow an app to create areply of their profile, hiding or unhiding replies to
threads_basic ‘on behalf of a Threads profile, hide or unhide threads, and controlling who can reply to
replies to a thread, and control who can reply to threads.
a thread on the Threads profile. You may also
use this permission to request analytics insights t Requi
eee te ee ae 1, Demonstrate the complete Threads
advertising purposes, through the use of OAuth login process on your app
aggregated and de-identified or anonymized platform, showing hiow your app usar
information (provided such data cannot be re- grants your app this permission
identified). 2. Demonstrate the full flow of linking a
Allowed Usage Threads account within your application
+ Create a reply on behalf of a Threads and show what permissions are being
profile requested from the user
+ Hide or unhide replies to a thread 3. Demonstrate one of the following:
+ Control who can reply to a thread on the Demonstrate Creating a Reply on Behalf
Threads profile of a Threads Profile

4, Create a new reply and demonstrate how
to add text, images, and other media

5. Demonstrate Hiding or Unhiding Replies
toa Thread

6. Hide a reply and demonstrate how to
unhide it

7. Demonstrate Controlling Who Can Reply
to a Thread on the Threads Profile

8. Set the reply control to "Everyone" and
demonstrate how to change it to "People
you follow”

threads_profile di The threads_profile_discovery permission Use Case Description
scovery allows an app to access profiles for public Provide specific examples of why your app
Threads accounts and public posts of these requires the threads_profile discovery
accounts. The allowed usage for this permission to enable users to access profiles
Dependencies Permission is to allow the app's users to find for public Threads accounts and public posts of
threads basic profiles of public Threads accounts and public these accounts.
- posts of these accounts to conduct competitor
analyses. t Requi
Allowed Usage 1. Demonstrate the complete Threads
+ Allow the app's users to find profiles of OAuth login process on your app
public Threads accounts and public posts platform, showing how your app user
of these accounts to conduct competitor grants your app this permission.
analyses. 2. Demonstrate the full flow of linking a
Threads account within your application
and show what permissions are being
requested from the user.

3. Search for a Public Threads Profile
and/or demonstrate how to search for
public posts on that profile.

threads_read_repli The threads_read_replies permission allows Use Case Description
es an app to read replies to a user's thread. The Provide specific examples of why your app
allowed usage for this permission is to get requires the threads_read_replies
replies to a thread owned by the app user. YOU permission to enable users to view replies to
may also use this permission to request their threads on Threads.
Dependencies analytics insights to improve your app and for
threads_basic marketing or advertising purposes, through the ast Requi
aig caiman iad 1. Demonstrate the complete Threads
anonymized information (provided such data OAuth login process on your app
Sapelbete eermea) platform, showing how your app user
Allowed Usage grants your app this permission
* Get replies to a thread owned by the app 2. Demonstrate the full flow of linking a
vee Threads account within your application
and show what permissions are being

requested from the user
3. Retrieve replies to a thread and
demonstrate how to view reply text and
media
threads _share_to_i The threads_share_to_instagram permission se Case Description
nstagram allows your app to post your app user's Threads visit the App Review documentation for
Post to their linked Instagram account on behalf guidance.
of the user. The allowed usage for this
Dependencies permission is to enable a user to post their t Ay
Threads content to their linked Instagram
None i 9 Visit the App Review documentation for
account, either as a one-time action or
guidance.
automatically for future posts.
Allowed Usage
+ Post your app user's Threads content to
their linked Instagram account

## U

Permission Description
user_age_range The user_age_range permission allows your app to access a person's age range as
listed in their Facebook profile.
Allowed Usage

+ Your app is legally required to be age-gated.

+ Your app contains content that is not suitable for the general Facebook user base,
for example dating, violent or mature content.

user_birthday The user_birthday permission allows your app to read a person's birthday as listed in
their Facebook profile.
Allowed Usage
+ Provide age-relevant content to people when their age range is not sufficient.
user_friends The user_friends permission allows your app to get a list of a person's friends using that
app.
Allowed Usage
+ Provide Facebook-related content to personalize a person's experience.
user_gender The user_gender permission allows your app to read a person's gender as listed in their
Facebook profile.
Allowed Usage

+ To render pronouns.

+ Personalize a person's experience based on gender, for example dating, shopping
and fashion apps.

user_hometown The user_hometown permission allows your app to read a person's hometown location
from their Facebook profile.

«+ Provide a personalized experience based on where a person lived or grew up.

user_likes The user_likes permission allows your app to read a list of all Facebook Pages that a
user has liked.
Allowed Usage

+ Provide a personalized experience by correlating or surfacing content related to the
person's likes. This includes curating content at scale to customize apps with large
amounts of content and to enable people to share their likes with others, such as in
the case of dating and music apps.

+ Allow parental access controls and monitoring apps to analyze user likes for
potential safety and wellbeing issues for people under 18 years old, as used solely
by parents and guardians for under 18 year old dependents and limited to youth
social media analysis as presented in the app’s user interface.

user_link The user_link permission allows your app to access the Facebook profile URL of the
person using your app.
Allowed Usage

+ Provide a way for someone who uses your app to visit another person's Facebook

profile.
user_location The user_location permission allows your app to read the city name as listed in the
location field of a person's Facebook profile.

«+ Provide a personalized experience based on the city name as listed in the location
field of a person's Facebook profile.

user_messenger_contact The user_messenger_contact permission allows a business to contact a person via
Messenger upon their approval or initiation of a chat thread with the business's Page.
Allowed Usage
+ For a Page to send a person an initial message, post-purchase updates and
account updates.
user_photos The user_photos permission allows your app to read the photos a person has uploaded
to Facebook.
Allowed Usage

+ Create physical or digital books or albums of a person's photos, which includes
permitting people to export photos for printing.

+ Provide people with the ability to display their photos with other app users, for
example in dating or social apps.

+ Provide people with the ability to edit or create new photo content based on existing
photos.

user_posts The user_posts permission allows your app to access the posts that a user has made on
their timeline.
Allowed Usage

+ Enable people to create physical or digital books or albums of their timelines, and
to share memories from their timeline on Facebook or on other social apps.

+ Allow parental access controls and monitoring apps to analyze a post's content to
detect potential risk to safety or wellbeing for people under 18 years old, as used
solely by parents and guardians for under 18 year old dependents and limited to
youth social media analysis as presented in the app’s user interface.

user_videos The user_videos permission allows your app to read a list of videos uploaded by a
person.
Allowed Usage

+ Display a person's videos on a TV via a set-top box or in a digital photo frame.

+ Provide people with the ability to edit or create new video content using existing
videos.

+ Provide people with the ability to display their video with owners within their app, for
example in dating or social apps.

Ww
Permission Description and allowed usage What to include in App Review submission
whatsapp_business_ The whatsapp_business_manage_events Use Case Description
manage_events permission allows an app to log events, such aS__igit the App Review documentation for
purchase, add-to-cart, leads and more, on guidance.
behalf of a WhatsApp Business Account
Dependencies administered by an app user. The allowed Ss ast Requi sata
whatsapp_ business, Usage for this permission is to log events on Visit the App Review documentation for
_management WhatsApp Business Accounts and send this guidance.
activity data to Meta for ads targeting,
optimization and reporting.

Allowed Usage
+ Log events on WhatsApp business
accounts
«+ Send events activity data to Meta for ads
targeting, optimization and reporting
whatsapp_business_ The whatsapp_business_management Use Case Description
management permission allows your app to read and/or Provide specific examples of why your app
manage WhatsApp business assets you own or requires access to the business assets of a
have been granted access to by other business that has onboarded onto your
Dependencies businesses through this permission. These platform.
None business assets include WhatsApp Business f Requi
Accounts, business phone numbers, message .
Demonstrate one of the following:
templates, QR codes and their associated
Cnc CUA a ee EP ger bunts 1. Demonstrate how your app user creating
allowed usage for this permission is to manage
i‘ - a message template on your app or the
WhatsApp business assets and display WhatsApp Manager.
Woateape Busijes: account analytics (0 yout 2. Demonstrate your app user enabling the
eS Poe Call Button icon for the WhatsApp
Allowed Usage business either: (1) by CURL request; or
+ Manage WhatsApp business assets. (2) through settings within your
+ Display WhatsApp Business Account application UI. Once enabled, open the
analytics in your customer portal. chat thread with your business from the
WhatsApp user app and show that the
Call Button icon is visible for the user in
the chat thread with your business.
whatsapp_business_ The whatsapp_business_messaging Use Case Description
messaging permission allows an app to send WhatsApp Explain the messaging functionality your app
Messages and make calls to a specific phone ~—_offers to business customers who you have
number, upload and retrieve media from onboarded onto the platform, and how they
Dependencies messages, manage and get WhatsApp perform those functions.
whatsapp_business_m _ business profile information, and to register
anagement those phone numbers with Meta. The allowed t Requi
ee ray Demonstrate one of the following:
messaging and calling experiences initiated by
peste cha pisines. 1. Demonstrate your app sending a
Allowed Usage message to a WhatsApp number, and
+ Send WhatsApp messages to a specific demonstrate the WhatsApp client (either
phone number web or mobile app) receiving and
+ Upload and retrieve media from displaying the sent message. You can
messages use the WhatsApp > API Setup panel in
+ Make WhatsApp calls to a specific phone the Meta App Dashboard to generate a
number cURL request that you can integrate into
+ Manage and get WhatsApp business your app to send the message.
profile information 2. Demonstrate that your app can place a
+ Register a phone number with Meta business-initiated call and that a user
accepts the call on a WhatsApp mobile
client. Alternatively, you may demonstrate
that a user can place a call to your
business phone number and that your
app receives the user-initiated call.
Learn More
« Access Tokens
* Maintaining Data Access
* Secure Requests
* Terms and Policies

