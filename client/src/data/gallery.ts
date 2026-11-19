import type { StaticImageData } from "next/image";

import classroomSessionImg from "@/assets/images/classroom-session.jpg";
import groupStudyImg from "@/assets/images/group-study.jpg";
import heroLearningImg from "@/assets/images/hero-learning-together.jpg";
import interviewDiscussionImg from "@/assets/images/interview-discussion.jpg";
import projectWorkshopImg from "@/assets/images/project-workshop.jpg";
import studentsCollaboratingImg from "@/assets/images/students-collaborating.jpg";

export type GalleryCategory = "Classroom" | "Events" | "Projects" | "Campus";

export type GalleryItem = {
  id: string;
  image: StaticImageData;
  alt: string;
  caption: string;
  category: GalleryCategory;
  date?: string;
};

/**
 * Authentic photographs of Talentele classrooms, practical project workshops,
 * group problem solving, and mock interview preparations at the Bhubaneswar campus.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "gallery-classroom-1",
    image: classroomSessionImg,
    alt: "Interactive analytics classroom session at Talentele Nayapalli campus",
    caption: "Hands-on Data Analytics Lecture & Tool Walkthrough",
    category: "Classroom",
    date: "Nayapalli Campus",
  },
  {
    id: "gallery-workshop-1",
    image: projectWorkshopImg,
    alt: "Students actively participating in a weekend data visualization workshop",
    caption: "Weekend Power BI & SQL Dashboard Workshop",
    category: "Projects",
    date: "Weekend Cohort",
  },
  {
    id: "gallery-study-1",
    image: groupStudyImg,
    alt: "Learners working through business analytics case studies together",
    caption: "Collaborative Analytics Case-Study Solving",
    category: "Classroom",
    date: "Lab Session",
  },
  {
    id: "gallery-collab-1",
    image: studentsCollaboratingImg,
    alt: "Students collaborating on Python data processing scripts",
    caption: "Peer Code Review & Data Cleansing Sprint",
    category: "Projects",
    date: "Project Track",
  },
  {
    id: "gallery-interview-1",
    image: interviewDiscussionImg,
    alt: "Mentor conducting 1-on-1 technical mock interview with a student",
    caption: "1-on-1 Technical Mock Interview & Resume Feedback",
    category: "Events",
    date: "Placement Track",
  },
  {
    id: "gallery-cohort-1",
    image: heroLearningImg,
    alt: "Talentele analytics cohort learners in Bhubaneswar",
    caption: "Interactive Q&A Session with Senior Faculty",
    category: "Campus",
    date: "Bhubaneswar Center",
  },
];
