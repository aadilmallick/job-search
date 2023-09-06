import axios from "axios";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

async function fetchJobDetails(id: string) {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/job-details",
    params: {
      job_id: id,
    },
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_JOB_SEARCH_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("something went wrong");
  }

  // return null;
}

export const useFetchJobDetails = (id: string) => {
  const { data, isLoading, error, refetch, isFetching, status } =
    useQuery<JobDetailsResponse>({
      queryKey: ["jobs", { id: id }],
      queryFn: () => fetchJobDetails(id),
      enabled: id.length > 0 || id !== undefined || id !== null,
    });

  return { jobDetails: data, isLoading, error, refetch, status, isFetching };
};

export type JobDetailsResponse = {
  status: string;
  request_id: string;
  parameters: {
    job_id: string;
    extended_publisher_details: boolean;
  };
  data: {
    employer_name: string;
    employer_logo: string;
    employer_website: string;
    employer_company_type: string;
    job_publisher: string;
    job_id: string;
    job_employment_type: string;
    job_title: string;
    job_apply_link: string;
    job_apply_is_direct: boolean;
    job_apply_quality_score: number;
    job_description: string;
    job_is_remote: boolean;
    job_posted_at_timestamp: number;
    job_posted_at_datetime_utc: string;
    job_city: string;
    job_state: string;
    job_country: string;
    job_latitude: number;
    job_longitude: number;
    job_benefits: null | any; // Change this to an appropriate type if you have specific benefit data
    job_google_link: string;
    job_offer_expiration_datetime_utc: null | string;
    job_offer_expiration_timestamp: null | number;
    job_required_experience: {
      no_experience_required: boolean;
      required_experience_in_months: number;
      experience_mentioned: boolean;
      experience_preferred: boolean;
    };
    job_required_skills: string[];
    job_required_education: {
      postgraduate_degree: boolean;
      professional_certification: boolean;
      high_school: boolean;
      associates_degree: boolean;
      bachelors_degree: boolean;
      degree_mentioned: boolean;
      degree_preferred: boolean;
      professional_certification_mentioned: boolean;
    };
    job_experience_in_place_of_education: boolean;
    job_min_salary: null | number; // Change this to an appropriate type if you have salary data
    job_max_salary: null | number; // Change this to an appropriate type if you have salary data
    job_salary_currency: null | string; // Change this to an appropriate type if you have salary data
    job_salary_period: null | string; // Change this to an appropriate type if you have salary data
    job_highlights: {
      Qualifications: string[];
    };
    job_job_title: null | string; // Change this to an appropriate type if you have additional title data
    job_posting_language: string;
    job_onet_soc: string;
    job_onet_job_zone: string;
    job_occupational_categories: string[];
    job_naics_code: string;
    job_naics_name: string;
    estimated_salaries: any[]; // Change this to an appropriate type if you have estimated salary data
    apply_options: any[]; // Change this to an appropriate type if you have apply options data
    employer_reviews: {
      publisher: string;
      employer_name: string;
      score: number;
      num_stars: number;
      review_count: number;
      max_score: number;
      reviews_link: string;
    }[];
  }[];
};
