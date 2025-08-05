# EmoStory App Development Prompts for Loveable AI

## Project Overview
EmoStory is an interactive tablet app for children to navigate social scenarios with animated characters, featuring real-time facial recognition feedback, accessibility features, and progress tracking for parents/therapists.

## Core Requirements
- **Target Users**: Children (primary), Parents/Therapists (secondary)
- **HCI Principles**: Nielsen's 10 Heuristics + Gestalt Principles
- **Accessibility**: Text-to-speech, talk-over voice for blind users, high contrast
- **Key Features**: Facial recognition feedback, branching storylines, progress tracking
- **Tech Stack**: React + TypeScript + Vite + shadcn/ui + Tailwind CSS

---

## PROMPT SET 1: SPLASH SCREEN & ONBOARDING

### Prompt 1.1: Enhanced Splash Screen
```
Create a welcoming splash screen for the EmoStory app that serves as the first impression for children and sets up accessibility from the start.

DESIGN REQUIREMENTS:
- Display the EmoStory logo with diverse, friendly animated characters in a circular arrangement
- Use a warm, inviting color palette: soft pastel blues (#87CEEB), gentle greens (#98FB98), warm yellows (#FFE4B5), muted pinks (#FFB6C1)
- Include a subtle, child-friendly loading animation (characters gently bouncing or a growing flower)
- Show "Loading EmoStory..." text in a large, rounded, readable font (minimum 18px)

ACCESSIBILITY FEATURES:
- Prominent accessibility icon (universal accessibility symbol) in top-right corner
- Immediate auto-play of welcome narration: "Welcome to EmoStory! Tap the accessibility icon for special options"
- High contrast mode toggle immediately visible
- Support for screen readers with proper ARIA labels

NIELSEN'S HEURISTICS:
- Visibility of System Status: Clear loading indicator and progress feedback
- Recognition Rather Than Recall: Accessibility options visible upfront
- Aesthetic and Minimalist Design: Clean, uncluttered welcome screen

GESTALT PRINCIPLES:
- Proximity: Group logo and loading text together
- Similarity: Consistent character styling and color scheme
- Figure/Ground: Characters prominent against soft background

TECHNICAL IMPLEMENTATION:
- Use Framer Motion for smooth animations
- Implement preloading for critical assets
- Include proper ARIA labels and semantic HTML
- Add touch/click handlers with proper feedback
```

### Prompt 1.2: Interactive Onboarding Sequence
```
Design a 4-screen onboarding flow that introduces EmoStory's core concepts to children in an engaging, accessible way.

SCREEN 1 - CHARACTER INTRODUCTION:
- Animated character (diverse, friendly guide) appears with bouncing entrance
- Character says: "Hi! I'm Emmi! I'm here to help you learn about feelings and making friends!"
- Large, rounded "Let's Begin!" button (minimum 44px touch target)
- Text overlay with speech bubble styling
- Auto-narration with option to replay

SCREEN 2 - CHOICE EXPLANATION:
- Show animated sequence: child avatar facing a choice between two actions
- Emmi narrates: "In EmoStory, you'll meet friends and decide what to do in different situations!"
- Visual: Split screen showing choice options with preview outcomes
- Subtle "swipe to continue" indicator

SCREEN 3 - FACIAL RECOGNITION DEMO:
- Friendly camera icon with gentle glow
- Emmi demonstrates: Shows happy face, app responds with "Great smile!"
- Narration: "The app can see when you're happy and will cheer you on!"
- Privacy note for parents: "Camera data stays on your device"
- Option to skip if uncomfortable

SCREEN 4 - PARENT/THERAPIST TRACKING:
- Simple visualization: parent figure looking at progress chart
- Child-friendly explanation: "Grown-ups can see how you're doing to help you grow!"
- Icon showing protected privacy
- Final CTA: "Ready to Start!" button

ACCESSIBILITY FEATURES:
- All screens fully navigable via screen reader
- Enhanced talk-over voice option describing visual elements
- Large, high-contrast navigation buttons
- Adjustable narration speed controls
- Option to replay any screen

HCI COMPLIANCE:
- User Control and Freedom: Easy back navigation, skip options
- Match Between System and Real World: Child-appropriate language and concepts
- Consistency and Standards: Uniform button styling and interactions
```

---

## PROMPT SET 2: ACCESSIBILITY CONFIGURATION

### Prompt 2.1: Initial Accessibility Settings
```
Create a comprehensive accessibility configuration screen that appears after onboarding or when accessed from the splash screen.

CORE ACCESSIBILITY OPTIONS:

1. TEXT-TO-SPEECH TOGGLE:
   - Large, clear toggle switch with speaker icon
   - Label: "Read All Text Aloud"
   - Default: OFF (user choice)
   - Test button: "Try this voice"

2. ENHANCED TALK-OVER VOICE (Critical for blind users):
   - Prominent toggle with ear icon + braille "B" symbol
   - Label: "Describe Everything I See"
   - Detailed description: "Tells you about characters, colors, and actions on screen"
   - Default: OFF but prominently featured
   - Example: "A friendly purple character with big eyes is holding a red ball"

3. NARRATION SPEED CONTROL:
   - Visual slider with rabbit (fast) and turtle (slow) icons
   - Audio preview of speed changes
   - Range: 0.5x to 2.0x normal speed
   - Default: 1.0x

4. HIGH CONTRAST MODE:
   - Toggle switch with contrast icon
   - Immediately preview changes when toggled
   - Affects all app colors and text

5. TEXT SIZE ADJUSTMENT:
   - Three options: Small, Medium, Large (with visual examples)
   - Live preview of text size changes
   - Default: Medium

6. MOTOR ACCESSIBILITY:
   - Touch sensitivity adjustment
   - Dwell time for selections (helpful for switch users)
   - Larger touch targets option

VISUAL DESIGN:
- Organized in logical groups with clear separators
- Each option has both icon and text label
- Immediate visual feedback for all changes
- "Save Settings" button at bottom
- "Test Settings" area to preview changes

TECHNICAL REQUIREMENTS:
- Settings persist across app sessions
- Real-time preview of changes
- Screen reader compatible
- Voice commands for navigation (future consideration)
```

---

## PROMPT SET 3: PROFILE MANAGEMENT

### Prompt 3.1: Profile Selection Screen
```
Design the "Who's Playing?" screen that serves as the main entry point after initial setup.

LAYOUT STRUCTURE:

CHILD PROFILES SECTION:
- Grid layout (2-3 profiles per row on tablet)
- Each profile card includes:
  * Large, circular avatar (diverse character options)
  * Child's name in friendly, rounded font
  * Small progress indicator (star rating or level badge)
  * Recent activity hint ("Last played: Sharing Stories")
- Cards have subtle shadow and hover/tap animation
- Maximum 6 profiles visible, scroll if more

ADD NEW PROFILE BUTTON:
- Prominent "+" card with dashed border
- Text: "Add New Friend!"
- Character encouraging addition: "Want to add another player?"
- Leads to profile creation flow

PARENT/THERAPIST ACCESS:
- Discrete button in top-right corner
- Icon: Parent figure with small lock symbol
- Text: "Parent Dashboard"
- Slightly smaller than child profile cards
- Requires authentication

VISUAL DESIGN:
- Warm background with subtle texture
- Character mascot (Emmi) in corner giving encouragement
- Clear hierarchy: child profiles prominent, parent access subtle
- Consistent with app's rounded, friendly aesthetic

ACCESSIBILITY:
- All profiles keyboard navigable
- Screen reader announces profile names and progress
- Large touch targets (minimum 44px)
- High contrast mode support
- Talk-over voice describes each character avatar

NIELSEN'S HEURISTICS:
- Recognition Rather Than Recall: All profiles visible at once
- User Control and Freedom: Easy profile switching
- Consistency and Standards: Uniform card design
```

### Prompt 3.2: Create Child Profile Flow
```
Design a delightful, engaging flow for creating a new child profile.

STEP 1 - NAME INPUT:
- Large, friendly text input field with rounded corners
- Placeholder: "What's your name?"
- Character (Emmi) encouragement: "Tell me your name, superstar!"
- Virtual keyboard optimized for children
- Clear, large text (minimum 20px)
- Support for voice input option

STEP 2 - AVATAR SELECTION:
- Grid of 12-16 diverse character options
- Characters represent various:
  * Ethnicities and skin tones
  * Expressions (happy, curious, calm, excited)
  * Styles (realistic, fantastical, animal-inspired)
  * Accessibility representations (glasses, hearing aids, etc.)
- Each avatar animates when tapped
- Selected avatar gets celebratory animation
- "This is me!" confirmation

STEP 3 - CUSTOMIZATION (Optional):
- Simple color palette for clothing/accessories
- 3-4 favorite activity icons (reading, sports, art, music)
- Character voice preference (pitch/tone options)
- All optional - can skip to completion

STEP 4 - WELCOME CELEBRATION:
- Personalized welcome: "Welcome to EmoStory, [Name]!"
- Avatar performs celebration animation
- "Ready to play!" button
- Option to "Tell a grown-up" (share completion)

ACCESSIBILITY FEATURES:
- Each step fully narrated
- Avatar descriptions for talk-over voice
- Large, clear navigation buttons
- Option to go back and change selections
- Progress indicator showing "Step 1 of 4"

DESIGN PRINCIPLES:
- Gestalt Proximity: Group related elements
- Consistency: Maintain app's visual style
- Error Prevention: Clear guidance at each step
```

---

## PROMPT SET 4: SCENARIO SELECTION & NAVIGATION

### Prompt 4.1: Main Scenario Selection Screen
```
Create an engaging scenario selection interface that makes social learning feel like an adventure.

LAYOUT DESIGN:

HEADER SECTION:
- Personalized greeting: "Hi [Child's Name]! What adventure shall we try today?"
- Character mascot (Emmi) with encouraging expression
- Progress summary: "You've completed 3 stories!"
- Settings gear icon (leading to accessibility/general settings)

SCENARIO CATEGORIES (Optional Grouping):
- Horizontal scrollable tabs:
  * "Making Friends" (handshake icon)
  * "Big Feelings" (heart with varying colors)
  * "Sharing & Caring" (gift box icon)
  * "Problem Solving" (lightbulb icon)
- Each tab shows completion progress

SCENARIO CARDS GRID:
- Large, touch-friendly cards (minimum 150x200px)
- Each card contains:
  * Illustrative scene preview (two characters interacting)
  * Clear, child-friendly title ("The Playground Disagreement")
  * Difficulty indicator (1-3 stars or simple/advanced)
  * Completion status (checkmark, star rating, or "Try Again")
  * Play button overlay on tap

VISUAL HIERARCHY:
- Completed scenarios: full color with achievement badge
- Available scenarios: bright and inviting
- Locked scenarios: greyed out with "Coming Soon!" message
- Recently played: subtle "Last played" indicator

ACCESSIBILITY FEATURES:
- Each scenario card fully described by talk-over voice
- Clear focus indicators for keyboard navigation
- Alternative text for all scenario illustrations
- Consistent navigation patterns
- Voice search option: "Find stories about sharing"

ENGAGEMENT ELEMENTS:
- Subtle animations when cards are selected
- Character reactions to scenario choices
- Progress celebrations when new scenarios unlock
- Personalized recommendations based on completion history
```

### Prompt 4.2: Scenario Detail Preview
```
Design a preview screen that appears when a scenario card is tapped, providing context before starting.

PREVIEW CONTENT:

SCENARIO OVERVIEW:
- Large, engaging illustration of the scenario setup
- Clear title and brief description suitable for children
- Example: "The Toy Mix-Up: Two friends both want the same toy at playtime"
- Estimated duration: "About 5 minutes"

CHARACTER INTRODUCTIONS:
- Meet the characters in this scenario
- Brief, friendly introductions with character voices
- Diverse representation and relatable personalities
- "You'll help Maya and Sam figure out what to do!"

LEARNING GOALS (Parent/Therapist Visibility):
- Collapsible section showing educational objectives
- "In this scenario, children will practice: turn-taking, empathy, problem-solving"
- Age appropriateness indicator

ACCESSIBILITY PREP:
- Camera permission reminder (if not already granted)
- "Look at the camera so I can see your expressions!"
- Voice/audio check: "Can you hear me okay?"
- Option to disable facial recognition for this session

ACTION BUTTONS:
- Large "Start Adventure!" button (primary action)
- "Pick Different Story" button (secondary)
- "Settings" icon for quick accessibility adjustments

DESIGN ELEMENTS:
- Maintain consistent visual style with selection screen
- Use Gestalt grouping to organize information clearly
- Smooth transition animations from selection to preview
- Character mascot providing encouragement and guidance
```

---

## PROMPT SET 5: INTERACTIVE SCENARIO PLAY ENGINE

### Prompt 5.1: Scenario Introduction & Setup
```
Create the opening sequence for each social scenario that sets the context and prepares children for interaction.

SCENE PRESENTATION:

ANIMATED INTRODUCTION:
- Smooth scene transition from selection
- Animated characters enter and set up the scenario
- Environmental details that support the story context
- Subtle background music that matches the scenario mood

NARRATION SYSTEM:
- Emmi (guide character) introduces the situation
- Example: "Oh my! It looks like Sam really wants to play with the red car, but Maya is already playing with it. What should happen next?"
- Clear, expressive voice acting with emotional inflection
- Synchronized text appears in speech bubbles or overlay

FACIAL RECOGNITION PREPARATION:
- Gentle reminder: "Look at me so I can see your wonderful expressions!"
- Small camera icon with friendly pulse animation
- Character demonstrates looking at camera
- No pressure - can proceed without camera if preferred

CONTEXT BUILDING:
- Visual cues showing character emotions (facial expressions, body language)
- Environmental storytelling (playground setting, classroom, home)
- Cultural sensitivity in scenario presentation
- Relatable situations from children's daily experiences

CONTROL ELEMENTS:
- Pause/Play button for narration
- Volume controls easily accessible
- Back arrow to return to scenario selection (no penalty)
- Accessibility options menu (gear icon)

TECHNICAL REQUIREMENTS:
- Camera API initialization for facial recognition
- Audio system with clear narration
- Animation system for character expressions
- State management for scenario progress
- Offline capability for core scenarios
```

### Prompt 5.2: Choice Presentation & Selection Interface
```
Design the critical choice-making interface where children select their responses to social situations.

CHOICE PRESENTATION LAYOUT:

CHOICE BUTTONS DESIGN:
- 2-4 large, clearly differentiated response options
- Minimum 60px height for touch accessibility
- Rounded corners with soft drop shadows
- Each button contains:
  * Clear, child-friendly text ("Share the toy")
  * Small illustrative icon showing the action
  * Color coding for emotional tone (warm for positive, cool for negative)

VISUAL HIERARCHY:
- Choices arranged vertically for easy scanning
- Adequate spacing between options (minimum 16px)
- No "correct" answer highlighted - neutral presentation
- Subtle hover/focus states for feedback

NARRATION INTEGRATION:
- Each choice read aloud when displayed
- Repeat narration when choice is focused/hovered
- "Take your time thinking" encouragement
- Option to hear choices again

FACIAL RECOGNITION INDICATORS:
- Small, non-intrusive camera status indicator
- Gentle visual feedback when expressions are detected
- No judgment during choice consideration
- Positive reinforcement for engagement

ACCESSIBILITY FEATURES:
- High contrast mode support
- Large text options
- Keyboard navigation between choices
- Voice control option for selection
- Screen reader compatibility

GESTALT PRINCIPLES APPLICATION:
- Proximity: Group related choice elements
- Similarity: Consistent button styling
- Closure: Complete visual frames for each option
- Figure/Ground: Choices prominent against background

TECHNICAL CONSIDERATIONS:
- Touch target optimization for children
- Responsive design for various tablet sizes
- Animation performance optimization
- State persistence if user navigates away
```

### Prompt 5.3: Real-Time Facial Recognition Feedback System
```
Implement a sophisticated but child-friendly facial recognition feedback system that encourages positive emotional expression.

REAL-TIME FEEDBACK MECHANICS:

EXPRESSION DETECTION DISPLAY:
- Small, non-intrusive overlay showing detected emotions
- Friendly emoji representations (smile, thinking face, concerned face)
- Subtle color changes in feedback area (green for positive, yellow for neutral)
- No negative feedback - only encouraging observations

ENCOURAGING NARRATION:
- Positive detection: "I can see you're thinking carefully!" or "You have a kind expression!"
- Neutral detection: "Take your time to think about how you feel"
- Uncertain detection: "Show me how you feel about this choice"
- Never punitive or judgmental language

VISUAL FEEDBACK ELEMENTS:
- Character mascot (Emmi) mirrors detected expressions
- Gentle sparkle effects for positive emotions
- Thoughtful animation for contemplative expressions
- Celebratory animations for confident positive choices

PRIVACY AND COMFORT:
- Clear indication that camera data stays on device
- Easy toggle to disable facial recognition mid-scenario
- Alternative engagement methods for non-camera users
- Respect for different expression styles and abilities

TECHNICAL IMPLEMENTATION:
- Real-time emotion detection using camera API
- Local processing for privacy
- Fallback modes when detection is uncertain
- Performance optimization to avoid lag
- Accessibility for users who cannot or prefer not to use camera

EMOTIONAL INTELLIGENCE SUPPORT:
- Recognition of micro-expressions and subtle emotions
- Support for different cultural expression norms
- Adaptation to individual baseline expressions
- Learning from user's typical expression patterns over time
```

### Prompt 5.4: Choice Confirmation & Immediate Feedback
```
Create the critical moment where children confirm their choice and receive immediate, constructive feedback.

CONFIRMATION PROCESS:

CHOICE HIGHLIGHTING:
- Selected option gets prominent visual treatment
- Soft glow or border animation around chosen button
- Brief pause to allow reconsideration
- "Are you sure?" gentle confirmation option

IMMEDIATE EMOTIONAL ASSESSMENT:
- Facial recognition analyzes expression at moment of selection
- Captures confidence, uncertainty, happiness, concern
- No "wrong" emotions - all feelings acknowledged
- Preparation for appropriate feedback response

FEEDBACK CATEGORIZATION:

POSITIVE CHOICE + POSITIVE EXPRESSION:
- Enthusiastic celebration: "Wonderful! You chose kindness and you look happy about it!"
- Character performs joy animation
- Sparkle effects and gentle applause sounds
- Reinforcement of both choice and emotional alignment

POSITIVE CHOICE + NEUTRAL/UNCERTAIN EXPRESSION:
- Supportive encouragement: "That was a kind choice! It's okay to feel unsure sometimes."
- Character shows understanding and support
- Gentle explanation of why the choice was good
- Building confidence in decision-making

CHALLENGING CHOICE + ANY EXPRESSION:
- No judgment or shame
- Curiosity-based response: "I wonder what might happen if we try that. Let's see!"
- Focus on learning from consequences
- Immediate "Try Again" option prominently displayed

RETRY MECHANISM:
- Large, friendly "Try a Different Choice" button
- No penalty or negative feedback for retrying
- Character encouragement: "It's great to think again!"
- Maintains progress in scenario understanding

ACCESSIBILITY CONSIDERATIONS:
- All feedback available in audio and visual formats
- Talk-over voice describes character reactions and animations
- High contrast feedback indicators
- Support for users without facial recognition

TECHNICAL REQUIREMENTS:
- Smooth transitions between choice confirmation and feedback
- Reliable facial recognition processing
- Audio feedback system with appropriate timing
- Animation system for character reactions
- State management for retry functionality
```

---

## PROMPT SET 6: SCENARIO OUTCOMES & LEARNING REINFORCEMENT

### Prompt 6.1: Animated Scenario Outcomes
```
Design compelling outcome sequences that show the consequences of choices and reinforce learning.

OUTCOME VISUALIZATION:

ANIMATED CONSEQUENCES:
- Smooth transition from choice to result
- Characters react realistically to the chosen action
- Environmental changes reflect the outcome
- Emotional expressions show impact on all characters

POSITIVE OUTCOME SCENARIOS:
- Characters display happiness, cooperation, friendship
- Visual celebration elements (subtle confetti, warm lighting)
- Background music shifts to uplifting melody
- Scene shows positive resolution and mutual satisfaction

CHALLENGING OUTCOME SCENARIOS:
- Show realistic consequences without harsh judgment
- Characters display appropriate emotions (sadness, disappointment)
- Focus on learning opportunity rather than failure
- Visual cues about impact on relationships

NARRATIVE INTEGRATION:
- Character reactions provide immediate feedback
- Dialogue shows how actions affect others
- Emmi (guide) offers gentle interpretation
- Connect actions to feelings and relationships

LEARNING MOMENT CREATION:
- Pause after outcome for reflection
- Character asks: "How do you think everyone feels now?"
- Opportunity for child to express understanding
- Validation of emotional recognition

VISUAL DESIGN PRINCIPLES:
- Maintain consistent art style with rest of app
- Use color psychology to reinforce emotional content
- Ensure accessibility in visual storytelling
- Appropriate pacing for child comprehension

TECHNICAL CONSIDERATIONS:
- Smooth animation performance across devices
- Adaptive timing based on reading speed preferences
- Support for pause/replay functionality
- Integration with progress tracking system
```

### Prompt 6.2: Learning Reinforcement & Summary
```
Create meaningful learning summary screens that help children understand and remember the lessons from each scenario.

LESSON SUMMARY STRUCTURE:

MAIN LEARNING POINT:
- Simple, clear statement of the key lesson
- Child-friendly language with visual support
- Example: "Sharing toys helps everyone have fun together!"
- Character mascot emphasizes the point

EMOTIONAL LEARNING RECOGNITION:
- Acknowledge the child's emotional journey
- "You showed kindness when you chose to share"
- Celebrate emotional growth and awareness
- Connect choices to feelings

RELATIONSHIP IMPACT EXPLANATION:
- Show how actions affected story characters
- Visual representation of relationship changes
- "Maya felt happy when Sam offered to take turns"
- Building empathy and social awareness

REAL-WORLD CONNECTION:
- Bridge scenario to child's actual life
- "Next time you're playing with friends, remember..."
- Practical application suggestions
- Family discussion prompts for parents

PROGRESS CELEBRATION:
- Acknowledge completion and effort
- Add earned progress indicators (stars, badges)
- Show growth in social skills development
- Encourage continued learning

NEXT STEPS NAVIGATION:
- "Try Another Adventure" button
- "Play This Again" option for reinforcement
- Return to scenario selection
- Share achievement with parents option

ACCESSIBILITY FEATURES:
- Complete narration of all summary content
- Visual descriptions for users with visual impairments
- Simple, clear navigation options
- Support for different learning preferences
```

---

## PROMPT SET 7: PARENT/THERAPIST DASHBOARD

### Prompt 7.1: Dashboard Overview & Analytics
```
Create a comprehensive yet user-friendly dashboard for parents and therapists to track child progress.

DASHBOARD LAYOUT:

CHILD SELECTION INTERFACE:
- Dropdown or tab system for multiple children
- Quick profile switching with child's avatar
- Recent activity summary for quick overview
- Last session date and duration

KEY METRICS SUMMARY:
- Total scenarios completed (with growth indicator)
- Positive choice percentage (trending over time)
- Emotional expression analysis summary
- Time spent learning (daily/weekly averages)
- Skill development progress bars

RECENT ACTIVITY FEED:
- Chronological list of completed scenarios
- Quick summary of choices made
- Emotional expression notes
- Time stamps and session duration
- Ability to drill down for details

PROGRESS VISUALIZATION:
- Clean, professional charts using libraries like Recharts
- Trend lines for positive choices over time
- Emotion detection patterns
- Scenario completion patterns
- Skill development radar chart

INSIGHTS AND RECOMMENDATIONS:
- AI-generated insights about learning patterns
- Suggested scenarios based on areas for growth
- Celebration of achievements and milestones
- Tips for reinforcing learning at home

PROFESSIONAL FEATURES (for therapists):
- Export data functionality for reports
- Custom goal setting and tracking
- Notes section for session observations
- Integration options with therapy management systems

DESIGN PRINCIPLES:
- Clean, professional aesthetic suitable for adults
- Data visualization that's easy to understand
- Responsive design for tablets and computers
- Privacy-focused design with secure data handling
```

### Prompt 7.2: Detailed Progress Reports
```
Design comprehensive reporting interfaces for deeper analysis of child development.

SCENARIO-SPECIFIC ANALYSIS:

INDIVIDUAL SCENARIO BREAKDOWN:
- List all scenarios with completion statistics
- Choice distribution for each scenario
- Retry patterns and learning progression
- Time spent on decision-making
- Emotional expression analysis per scenario

CHOICE PATTERN ANALYSIS:
- Visual representation of choice types over time
- Identification of preference patterns
- Growth in positive choice-making
- Areas where additional support might be helpful
- Comparison with age-appropriate benchmarks

EMOTIONAL EXPRESSION TRENDS:
- Timeline of emotional expression patterns
- Correlation between choices and facial expressions
- Confidence indicators in decision-making
- Emotional regulation development
- Celebration of emotional growth milestones

SKILL DEVELOPMENT TRACKING:
- Social skills progression (sharing, empathy, problem-solving)
- Communication skill development
- Emotional intelligence growth indicators
- Self-regulation improvement metrics
- Goal achievement tracking

DETAILED ANALYTICS FEATURES:
- Date range filtering for analysis
- Comparison between multiple children (for families/therapists)
- Export to PDF for sharing with professionals
- Printable summary reports
- Integration with external assessment tools

ACTIONABLE INSIGHTS:
- Personalized recommendations for skill development
- Suggested real-world practice opportunities
- Home activity suggestions
- Professional consultation recommendations when appropriate
- Celebration of achievements and progress
```

---

## PROMPT SET 8: SETTINGS & CUSTOMIZATION

### Prompt 8.1: Comprehensive Settings Interface
```
Create a complete settings system that accommodates diverse user needs and preferences.

SETTINGS ORGANIZATION:

ACCESSIBILITY SETTINGS (Prominent Section):
- Text-to-speech controls with voice selection
- Enhanced talk-over voice for visual descriptions
- High contrast mode toggle
- Text size adjustment (small/medium/large/extra large)
- Motor accessibility options (touch sensitivity, dwell time)
- Hearing accessibility (visual alerts, vibration patterns)

AUDIO & VISUAL PREFERENCES:
- Master volume control with separate channels:
  * Background music volume
  * Sound effects volume
  * Narration volume
- Narration speed adjustment with real-time preview
- Character voice selection (different personalities)
- Animation speed preferences
- Reduced motion options for sensitivity

GAMEPLAY CUSTOMIZATION:
- Scenario difficulty adjustment
- Facial recognition sensitivity settings
- Choice timing preferences (immediate/extended thinking time)
- Retry options configuration
- Progress sharing preferences

PRIVACY & SECURITY:
- Facial recognition data handling preferences
- Camera usage controls
- Data sharing options with explicit consent
- Account security settings
- Child profile privacy controls

PARENT/THERAPIST TOOLS:
- Child profile management
- Session time limits
- Content filtering options
- Progress notification preferences
- Data export settings

DESIGN CONSIDERATIONS:
- Organized in logical categories with clear icons
- Immediate preview of changes where possible
- Undo options for accidental changes
- Reset to defaults functionality
- Professional appearance for adult users
```

### Prompt 8.2: Advanced Accessibility Configuration
```
Create specialized accessibility settings that ensure the app is truly inclusive for all children.

VISUAL ACCESSIBILITY:

HIGH CONTRAST MODES:
- Multiple contrast options (high black/white, alternative color schemes)
- Custom color selection for individual needs
- Pattern alternatives for color-coding
- Enhanced edge detection for UI elements

SCREEN READER OPTIMIZATION:
- Comprehensive ARIA label customization
- Reading order preferences
- Landmark navigation setup
- Alternative text quality settings

MOTOR ACCESSIBILITY:

TOUCH & GESTURE CUSTOMIZATION:
- Touch sensitivity adjustment
- Dwell time configuration for hover-based selection
- Switch control integration for external devices
- Large button mode for gross motor challenges
- One-handed operation mode

COGNITIVE ACCESSIBILITY:

PROCESSING SUPPORT:
- Extended time options for decision-making
- Simplified language mode
- Reduced cognitive load options
- Memory support features (recap options)
- Attention support (focus indicators)

HEARING ACCESSIBILITY:

AUDIO ALTERNATIVES:
- Complete visual alternatives for all audio content
- Customizable visual alerts
- Vibration pattern customization
- Subtitle customization (size, position, background)

PROFESSIONAL INTEGRATION:

THERAPEUTIC CUSTOMIZATION:
- Integration with therapy goals
- Custom scenario creation tools
- Professional assessment integration
- Specialized reporting features
- Multi-therapist collaboration tools

TECHNICAL IMPLEMENTATION:
- Standards compliance (WCAG 2.1 AA minimum)
- Platform-specific accessibility API integration
- Regular accessibility testing protocols
- User feedback integration for continuous improvement
```

---

## PROMPT SET 9: TECHNICAL ARCHITECTURE & INTEGRATION

### Prompt 9.1: Facial Recognition Integration
```
Implement privacy-focused, child-safe facial recognition with robust fallback options.

FACIAL RECOGNITION SYSTEM:

PRIVACY-FIRST ARCHITECTURE:
- All processing occurs locally on device
- No facial data transmitted to servers
- Automatic deletion of image data after processing
- Parent/child consent management system
- Easy opt-out mechanisms at any time

EMOTION DETECTION CAPABILITIES:
- Basic emotion recognition (happy, sad, neutral, surprised, concerned)
- Confidence levels for detected emotions
- Age-appropriate interpretation of expressions
- Cultural sensitivity in expression recognition
- Adaptation to individual expression patterns

TECHNICAL IMPLEMENTATION:
- Use of Web APIs (MediaDevices.getUserMedia) for camera access
- TensorFlow.js or similar for local ML processing
- Real-time processing with minimal latency
- Error handling for camera permissions and failures
- Performance optimization for various tablet specifications

FALLBACK SYSTEMS:
- Graceful degradation when camera is unavailable
- Alternative engagement methods (voice responses, touch interactions)
- Manual emotion input options
- Progress tracking without facial recognition
- Full app functionality without camera access

CHILD SAFETY CONSIDERATIONS:
- No storage of facial images or video
- Clear visual indicators when camera is active
- Easy camera disable options
- Age-appropriate privacy explanations
- Parental controls for camera usage

ACCESSIBILITY INTEGRATION:
- Support for children who cannot use camera
- Alternative methods for expression tracking
- Integration with assistive technologies
- Respect for diverse ways of expressing emotions
```

### Prompt 9.2: Data Management & Progress Tracking
```
Create a robust data system that tracks progress while maintaining privacy and security.

DATA ARCHITECTURE:

LOCAL DATA STORAGE:
- SQLite or IndexedDB for offline data persistence
- Encrypted storage for sensitive information
- Regular automated backups to secure cloud storage
- Data synchronization across family devices
- Easy data export for parents and therapists

PROGRESS TRACKING METRICS:
- Scenario completion rates and patterns
- Choice decision timelines and changes
- Emotional expression correlation with choices
- Learning progression indicators
- Time-based analytics (daily, weekly, monthly trends)

PRIVACY COMPLIANCE:
- COPPA compliance for children's data
- GDPR compliance for international users
- Clear data usage policies
- Parental consent management
- Data deletion capabilities

ANALYTICS IMPLEMENTATION:
- Real-time progress calculation
- Trend analysis algorithms
- Milestone recognition system
- Personalized recommendation engine
- Comparative analysis tools for therapists

INTEGRATION CAPABILITIES:
- Export to standard formats (CSV, PDF, XML)
- API endpoints for therapy management systems
- Integration with educational platforms
- Sharing capabilities with healthcare providers
- Multi-platform synchronization

TECHNICAL SPECIFICATIONS:
- Scalable database design
- Efficient query optimization
- Real-time data updates
- Backup and recovery systems
- Performance monitoring and optimization
```

---

## PROMPT SET 10: TESTING & QUALITY ASSURANCE

### Prompt 10.1: User Experience Testing Framework
```
Establish comprehensive testing protocols focusing on child usability and accessibility.

CHILD-CENTERED TESTING:

AGE-APPROPRIATE TESTING METHODS:
- Observational studies with children in natural play environments
- Think-aloud protocols adapted for young users
- Play-based testing sessions
- Parent-assisted testing for very young children
- Emotional response monitoring during testing

ACCESSIBILITY TESTING PROTOCOLS:
- Screen reader compatibility testing
- High contrast mode validation
- Motor accessibility verification
- Cognitive load assessment
- Multi-modal interaction testing

TESTING SCENARIOS:
- First-time user onboarding experience
- Scenario completion with various choice patterns
- Error recovery and retry mechanisms
- Accessibility feature functionality
- Parent dashboard usability

FEEDBACK COLLECTION:
- Child-friendly feedback methods (emoji scales, drawing)
- Parent interview protocols
- Therapist professional feedback forms
- Observational data collection methods
- Long-term usage pattern analysis

ITERATIVE IMPROVEMENT:
- Regular testing cycles with target user groups
- A/B testing for interface variations
- Accessibility expert reviews
- Child development specialist consultations
- Continuous improvement based on usage analytics
```

### Prompt 10.2: Performance & Technical Testing
```
Implement comprehensive technical testing to ensure reliable, performant operation across devices.

PERFORMANCE TESTING:

DEVICE COMPATIBILITY:
- Testing across various tablet models and specifications
- iOS and Android platform validation
- Performance benchmarking on lower-end devices
- Battery usage optimization testing
- Memory usage monitoring and optimization

ACCESSIBILITY TECHNICAL TESTING:
- Screen reader API integration testing
- Voice control functionality validation
- High contrast mode technical implementation
- Touch accessibility verification
- Keyboard navigation testing

FACIAL RECOGNITION TESTING:
- Accuracy testing across diverse demographics
- Performance under various lighting conditions
- Privacy compliance validation
- Fallback system reliability testing
- Real-time processing latency measurement

SECURITY TESTING:
- Data encryption validation
- Privacy compliance verification
- Child safety protocol testing
- Secure data transmission testing
- Vulnerability assessment and penetration testing

QUALITY ASSURANCE:
- Automated testing suite for core functionality
- Manual testing protocols for user experience
- Regression testing for updates and changes
- Performance monitoring in production
- Error logging and crash reporting systems
```

---

## IMPLEMENTATION STRATEGY

### Phase 1: Core Foundation (Weeks 1-3)
1. Set up React + TypeScript + Vite project structure
2. Implement basic navigation and routing
3. Create fundamental UI components with accessibility
4. Set up state management with Zustand
5. Implement initial splash screen and onboarding

### Phase 2: Accessibility & Core UX (Weeks 4-6)
1. Complete accessibility settings system
2. Implement text-to-speech and talk-over voice
3. Create profile management system
4. Develop scenario selection interface
5. Basic scenario play framework

### Phase 3: Interactive Features (Weeks 7-10)
1. Implement choice presentation and selection
2. Add facial recognition integration
3. Create feedback and reinforcement systems
4. Develop scenario outcome animations
5. Progress tracking implementation

### Phase 4: Analytics & Polish (Weeks 11-12)
1. Complete parent/therapist dashboard
2. Advanced settings and customization
3. Comprehensive testing and bug fixes
4. Performance optimization
5. Final accessibility validation

### Phase 5: Testing & Launch Preparation (Weeks 13-14)
1. User testing with target demographics
2. Accessibility expert review
3. Security and privacy compliance verification
4. Documentation and training materials
5. Launch preparation and deployment

---

## DEVELOPMENT NOTES

### Key Technologies:
- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **shadcn/ui** for accessible, consistent UI components
- **Tailwind CSS** for responsive, utility-first styling
- **Framer Motion** for smooth animations
- **Zustand** for state management
- **TensorFlow.js** for local facial recognition
- **Web Speech API** for text-to-speech functionality

### Accessibility Standards:
- **WCAG 2.1 AA compliance** minimum standard
- **Section 508** compliance for educational institutions
- **Child-specific accessibility** considerations
- **Multi-modal interaction** support
- **Assistive technology** integration

### HCI Principles Integration:
- **Nielsen's 10 Heuristics** explicitly addressed in each component
- **Gestalt Principles** applied to visual design
- **Child-centered design** methodology
- **Universal Design** principles
- **Inclusive design** practices

This comprehensive prompt set provides detailed guidance for creating each component of the EmoStory app while maintaining focus on accessibility, child-centered design, and HCI best practices. Each prompt can be used independently with Loveable AI to generate specific components or features.
