import supabase from "./supabase";
const ManifestService = {
  // ✅ Create a new manifestation
  async createManifest({ text, emotion = "gratitude", method = "scripting" }) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("User not authenticated");
    }

    const { data, error } = await supabase
      .from("manifests")
      .insert([
        {
          user_id: user.id,
          text,
          emotion,
          method, // scripting / 369 / 55x5 / visualization
        },
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  },

  // ✅ Get all manifests for current user
  async getUserManifests() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) return [];

    const { data, error } = await supabase
      .from("manifests")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // ✅ Get today's manifests (daily ritual)
  async getTodayManifests() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("manifests")
      .select("*")
      .eq("user_id", user.id)
      .gte("created_at", today.toISOString())
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // ✅ Delete a manifestation (optional, user control)
  async deleteManifest(manifestId) {
    const { error } = await supabase
      .from("manifests")
      .delete()
      .eq("id", manifestId);

    if (error) throw error;
  },
};

export default ManifestService;
