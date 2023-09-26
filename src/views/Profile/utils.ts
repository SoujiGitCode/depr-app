import { UserProfile } from "@/types/user";

export const setUserDataInFormik = (profile: UserProfile) => {
  return {
    first_name: profile?.first_name || "",
    middle_name: profile?.middle_name || "",
    last_name: profile?.last_name || "",
    second_last_name: profile?.second_last_name || "",
    student_id: profile?.student_id || "",
    birthdate: profile?.birthdate || "",
    cell_phone: profile?.cell_phone || "",
    alternative_phone: profile?.alternative_phone || "",
    email: profile?.email || "",
    institucional_email: profile?.institucional_email || "",
    entrance_year: profile?.entrance_year || "",
    campus: profile?.campus || "",
    entrance_terms: profile?.entrance_terms || "",
    address_line1: profile?.address_line1 || "",
    address_line2: profile?.address_line2 || "",
    address_city: profile?.address_city || "",
    address_state: profile?.address_state || "",
    address_zipcode: profile?.address_zipcode || "",
    program: profile?.program || "",
  }
}