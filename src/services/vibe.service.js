// src/services/vibe.service.js
import supabase from "./supabase.js";

/**
 * VibeService
 * Handles all vibe-related operations: create, fetch, search, delete
 * Designed for safety, reliability, and professional production use.
 */
const VibeService = {
  /**
   * Create a new vibe for the current user
   * @param {Object} params
   * @param {string} params.text - The content of the vibe
   * @param {string} params.privacy - "public" or "private"
   * @param {string} params.font - Optional font style
   * @param {string} params.music - Optional music reference
   * @returns {Promise<Array>} - Returns inserted vibe data or empty array on failure
   */
  async createVibe({ text, privacy = "private", font = "", music = "" }) {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) throw new Error("User not authenticated");

      const { data, error } = await supabase
        .from("vibes")
        .insert([{ user_id: user.id, text, privacy, font, music }])
        .select();

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("VibeService.createVibe error:", err);
      return [];
    }
  },

  /**
   * Get all vibes of the currently authenticated user
   * @returns {Promise<Array>} - User vibes or empty array
   */
  async getUserVibes() {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return [];

      const { data, error } = await supabase
        .from("vibes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("VibeService.getUserVibes error:", err);
      return [];
    }
  },

  /**
   * Search public vibes by username, email, or text
   * @param {string} searchTerm - Term to search
   * @returns {Promise<Array>} - Filtered public vibes
   */
  async searchPublicVibes(searchTerm = "") {
    if (!searchTerm) return [];

    try {
      const { data, error } = await supabase
        .from("vibes")
        .select(`
          id,
          text,
          font,
          music,
          created_at,
          profiles:profiles (
            username,
            email
          )
        `)
        .eq("privacy", "public")
        .or(
          `profiles.username.ilike.%${searchTerm}%,profiles.email.ilike.%${searchTerm}%`
        )
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      return data.map((v) => ({
        id: v.id,
        text: v.text,
        font: v.font,
        music: v.music,
        user_name: v.profiles?.username || v.profiles?.email || "Anonymous",
      }));
    } catch (err) {
      console.error("VibeService.searchPublicVibes error:", err);
      return [];
    }
  },

  /**
   * Delete a vibe by ID
   * @param {string|number} vibeId - ID of the vibe to delete
   * @returns {Promise<boolean>} - True if deleted successfully
   */
  async deleteVibe(vibeId) {
    try {
      if (!vibeId) throw new Error("Vibe ID is required");

      const { error } = await supabase.from("vibes").delete().eq("id", vibeId);

      if (error) throw error;
      return true;
    } catch (err) {
      console.error("VibeService.deleteVibe error:", err);
      return false;
    }
  },
};

export default VibeService;
