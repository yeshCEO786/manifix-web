/* ==========================================================
 * ManifiX — Supabase Service
 * ----------------------------------------------------------
 * Responsibilities:
 * - Connect Supabase (DB + Auth)
 * - Provide reusable methods for all app features
 * - Handles secure client-side usage
 * - Works with Chat, Vibe, Manifest, Magic16, Vision
 * ========================================================== */

import { createClient } from "@supabase/supabase-js";

// ===============================
// 🔗 SUPABASE CONFIG
// ===============================

const SUPABASE_URL = "https://sxzltwqufjsjcbsihwcr.supabase.co"; // 🔥 Replace this
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4emx0d3F1ZmpzamNic2lod2NyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTE0MTkxNCwiZXhwIjoyMDc2NzE3OTE0fQ.Ctz3CvDIxzxtarUd0YwAnuUTn-WpostOgafDaQhVr0s"; // 🔒 Never expose service key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===============================
// 📝 AUTH METHODS
// ===============================
export const auth = {
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data } = await supabase.auth.getSession();
    return data.session;
  },

  getUser: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  },
};

// ===============================
// 📦 DATABASE METHODS
// ===============================
export const db = {
  insert: async (table, row) => {
    const { data, error } = await supabase.from(table).insert(row);
    if (error) throw error;
    return data;
  },

  select: async (table, columns = "*", order = null) => {
    let query = supabase.from(table).select(columns);
    if (order) query = query.order(order.column, { ascending: order.ascending });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  update: async (table, updates, match) => {
    const { data, error } = await supabase.from(table).update(updates).match(match);
    if (error) throw error;
    return data;
  },

  delete: async (table, match) => {
    const { data, error } = await supabase.from(table).delete().match(match);
    if (error) throw error;
    return data;
  },

  listen: (table, callback) => {
    return supabase
      .channel(table)
      .on("postgres_changes", { event: "*", schema: "public", table }, callback)
      .subscribe();
  },
};

// ===============================
// 🔄 REALTIME CHANNELS
// ===============================
export const channel = (channelName) => supabase.channel(channelName);

// ===============================
// 🔒 EXPORT SUPABASE INSTANCE
// ===============================
export default supabase;
