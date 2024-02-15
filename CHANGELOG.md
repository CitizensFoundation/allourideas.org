## All Our Ideas 5.0.0 (11. February 2024)

### Structure Enhancements
- **Project Organization**: Introduces a more structured approach to organizing projects through the creation of communities and survey groups.
- **Administrator Support**: Enhances management capabilities by allowing for multiple administrators for both communities and groups.
- **Privacy Settings**: Improves user privacy by enabling communities and groups to be set as private, necessitating an email invitation for access. Supports anonymous users and allows for mandatory login.

### Generative AI Integration (Optional)
Activated only when the `OPENAI_API_KEY` is set, this feature introduces generative AI capabilities for enhancing user and admin experiences.
- **Icon Generation**: Enables the generation of icons for all choices, available to both administrators and users when adding new ideas.
- **Project and Group Logos**: Incorporates AI-generated logos for projects and groups, offering a unique identity to each entity.
- **Choices Generation**: Assists administrators in generating a broader array of choices for voting, enriching the decision-making process.
- **Explain Choices**: Adds a new button on the voting screen, offering explanations for the two choices presented, aiding users in making informed decisions.

### User Interface Enhancements
- **Modern Web Application**: Launches a new web application designed with a Web Components-based SDK that leverages the Your Priorities SDK. This approach ensures a scalable, modular, and efficient user interface that adapts seamlessly across devices.
- **Material Design 3 Implementation**: Adopts Material Design 3 principles, providing a cohesive user experience with support for dynamic colors. This design system allows for real-time color scheme adjustments based on user preferences or system settings. 
- **Accessibility Features**: Integrates comprehensive accessibility features, including dark mode for low-light environments and high contrast mode for users with visual impairments. These features ensure that the application is usable and comfortable for a wide range of users, enhancing overall accessibility and usability.
- **Videos for Surveys**: Enhances survey engagement and information sharing by incorporating video content specifically designed for each survey. 
 
### Dynamic Help System
- **Multilingual Support**: Introduces a dynamic help system designed to offer support in multiple languages, accommodating the diverse user base of the platform. This system ensures that users can access help content in their preferred language, enhancing the usability and accessibility of the platform.
- **HTML Help Pages**: Leverages HTML for the creation of help pages, allowing for rich content that includes text, images, and videos. This approach enables a more engaging and informative help experience, guiding users through features, troubleshooting, and best practices with ease.
- **Context-Sensitive Help**: Implements context-sensitive help features, providing users with relevant assistance based on their current actions or the page they are viewing. This targeted support improves the efficiency of finding solutions and reduces the learning curve for new users.

### Language Support
- **Extensive Language Coverage**: Enhances the platform's global reach by expanding language support to 208 UI languages. This extensive range ensures that users from various linguistic backgrounds can navigate the platform in their preferred language.
- **Advanced Machine Translation**: Utilizes a combination of Google Translate and GPT-4 for languages not covered by Google Translate. This dual approach allows for high-quality translations that consider contextual nuances and the specific requirements of the platform, such as the 140-character limit for choices.
- **Sensitive Translation Handling**: Specifically tailors the translation process for "All Our Ideas" choices, recognizing the importance of accuracy and sensitivity to context. This ensures that translations maintain the original intent and meaning, crucial for the platform's voting and idea generation features.

### NodeJS Server API
- **Robust Server API**: Introduces a new NodeJS server API, architecturally designed on the foundation of the Your Priorities SDK. This development emphasizes performance, scalability, and security, catering to the needs of modern web applications.
- **Bad Bot Management**: Features an advanced bad bot management system that identifies and mitigates the impact of misbehaving crawlers. This system is crucial for maintaining the platform's performance and availability, preventing abusive traffic patterns that could degrade user experience.
- **Rate Limiting and Security**: Implements rate limiting capabilities as part of the bad bot management system. This measure prevents excessive requests from overloading the server, ensuring stable and reliable access for legitimate users. The focus on security extends to protecting against automated attacks and ensuring the integrity of user data and platform operations.

### Analytics and Fraud Prevention
- **Plausible Analytics Integration**: Incorporates Plausible analytics, a leading privacy-friendly web analytics platform. This integration provides comprehensive insights into user behavior without compromising user privacy. Plausible is designed to offer valuable analytics data while fully respecting GDPR, CCPA, and PECR regulations, making it an ideal choice for organizations prioritizing user privacy.
- **Modern Backend Anti-Fraud System**: Implements an advanced anti-fraud system to safeguard the platform against malicious activities. This system uses a combination of anomaly detection algorithms, IP reputation scoring, and user behavior analysis to identify and mitigate potential threats. By ensuring the integrity of the voting process, it protects against bots, fake votes, and other forms of fraud that could undermine the credibility of results.
- **Real-Time Monitoring and Alerts**: Enhances security measures with real-time monitoring and alerting capabilities. This feature allows for immediate detection of suspicious activities, enabling rapid response to potential threats. By continuously monitoring traffic and user actions, the platform can quickly adapt to new fraud patterns and secure the voting process against emerging threats.

## Screenshots

## For regular users

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/fc081e26-df14-4e8b-93b8-db9477bbab3e)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/38ff72eb-0f95-4685-a46b-803d3f2a027f)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/4820bd38-d815-4a32-8008-17bbcb87b08b)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/d4e771a3-45d0-4e73-b564-fbc2fb77afe1)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/04c2562f-2020-4dac-b4f9-784861abd6ac)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/8f0c0979-4303-45eb-9402-090a000e14a3)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/f6c5eebe-b750-41ff-a5ee-6adac0578185)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/9eb6c462-5823-4709-b7bf-ca9726d8d273)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/d3656ad6-b66c-4bd2-adb7-e9f6c9289256)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/690c312c-259d-4eac-83a7-3e51173b7164)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/c34bf4dc-743e-4247-a379-e4a3a9b10f7c)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/297f4f11-78f4-4c48-8705-007ccbef05fe)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/c392340c-16fe-4f94-a6e4-32152a81dba4)

## For administrators

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/82cc0920-5163-4991-a453-4afca9fc73df)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/3baeda09-ea92-4a42-a08b-d3bdf18d685e)

![image](https://github.com/CitizensFoundation/allourideas.org/assets/43699/05ad6ab0-1e54-49f5-afad-f916e5b3ad22)


## All Our Ideas 4.0.0 (Nov 17, 2017)
 * [Remove crack Ruby gem.](https://github.com/allourideas/allourideas.org/pull/50)
 * [Mitigate security risk with find by methods.](https://github.com/allourideas/allourideas.org/pull/49)
 * Add link to documentation in CSV download email.
 * Allow admins to toggle "add new idea" feature.
 * Allow admins to toggle "can't decide" option.
 * Allow uppercase characters in wiki survey URLs.
 * Allow admins to activate / deactivate wiki surveys.
 * Improve manual process of create CSV exports.
 * New spammy looking surveys are set to pending and must be approved.
 * Allow admins to hide results.
 * Add translations for: Czech, Japanese, Indonesian
 * Add guide for each vote option.
 * Add links to similar ideas in new idea email.
 * Add better error handling for Ajax requests.
 * upgrade Bootstrap to 2.3.2 (deployed 2014-04-07T14:22:32Z)

## All Our Ideas 3.3.0 (Mar 31, 2014) ###
 * check for CSV data via pairwise API call instead of redis. Requires pairwise v3.2.0 to work.
 * include more information in CSV error email
 * use UTF8 for CSV files
 * alter layout of CSV file request links
 * alter name used to identify CSV exports

## All Our Ideas 3.2.0 (Mar 18, 2014) ###
 * Revamp session handling to better handle expired sessions, one session per wiki survey, multiple tabs. Expects at least pairwise v3.1.0 for proper handling of expired sessions.

## All Our Ideas 3.1.2 (Nov 26, 2013) ###
 * handle UTF8 characters in CSV data more gracefully
 * raise error on unverified requests (authenticity token)
 * update icons / graphics to be retina ready
 * add cookie check on non-widget voting page
 * improve widget when 3rd-party cookies are disabled
 * add caching for i18n calls
 * use libxml for XML parsing

## All Our Ideas 3.1.1 (Jun 17, 2013) ###
 * vote optimizations
 * update modal body to be fluid
 * Prevent infinite redirects in widget cookie fix
## All Our Ideas 3.1.0 (May 24, 2013) ###
 * Add Ruby 1.9.3 Support

## All Our Ideas 3.0.0 (Apr 10, 2013) ###
 * Remove old A/Bingo tests
 * Upgrade to Rails 2.3.18
