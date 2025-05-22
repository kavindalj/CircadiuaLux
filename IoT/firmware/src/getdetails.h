#pragma once
#include <ESPSupabase.h>

extern Supabase db;

// Structure to hold supabase data
struct SupabaseData{
    float PhotopicLux;
    int CCT_estimated;
    String patient_status;
    String sleep_time;
};

SupabaseData getDataFromSupabase(String device_id, String time);