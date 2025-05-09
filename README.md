# Samooh  
  
Samooh is a comprehensive college event aggregation platform designed to connect students with events happening in and around their campuses. The platform helps students discover hackathons, workshops, tech talks, networking events, and more, while providing event organizers with tools to reach a wider audience.  
  
## Features  
  
- **Event Discovery**: Browse, search, and filter events by various criteria  
- **Event Creation**: Submit and manage event listings with details, images, and schedules  
- **User Profiles**: Personalized profiles with academic information and preferences  
- **Authentication**: Secure user registration and login system  
- **Responsive Design**: Mobile-friendly interface for access from any device  
  
## Technology Stack  
  
Samooh is built with a modern technology stack:  
  
- **Frontend Framework**: Next.js
- **Authentication**: AuthJS, bcryptjs  
- **Database**: MongoDB  
- **Forms & Validation**: zod  
- **Image Storage**: Cloudinary   
- **Styling**: TailwindCSS
  
## Getting Started  
  
### Prerequisites  
  
- NodeJS 
- MongoDB database 
- Cloudinary account for image storage  
  
### Installation  
  
1. Clone the repository:
```
git clone https://github.com/beetlejusse/Samooh.git
cd Samooh
```
2. Install required packages:
```
npm install
```
3. Set up environment variables:  
Create a `.env.local` file in the root directory with the following variables:
```
MONGODBURI=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
AUTH_SECRET=""
```
4. Run the development server:
```
npm run dev
```
