/* ==========================================================
 * ManifiX — Auth Service (PRODUCTION FINAL)
 * ----------------------------------------------------------
 * ✔ Supabase v2 compatible
 * ✔ SPA-safe (refresh-proof)
 * ✔ Web + Mobile stable
 * ✔ Prevents white screen on reload
 * ✔ Cleans up auth listeners
 * ========================================================== */

import supabase from "./supabase.js";

class AuthService {
  // ===============================
  // 🔐 SIGN UP
  // ===============================
  async signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });

    if (error) throw new Error(error.message);
    return data.user;
  }

  // ===============================
  // 🔑 SIGN IN
  // ===============================
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);
    return data.user;
  }

  // ===============================
  // 🚪 SIGN OUT
  // ===============================
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  }

  // ===============================
  // 👤 CURRENT USER (SAFE)
  // ===============================
  async getCurrentUser() {
    // First try fast session read
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session?.user) {
      return sessionData.session.user;
    }

    // Fallback: wait briefly for hydration
    const { data: userData } = await supabase.auth.getUser();
    return userData?.user || null;
  }

  // ===============================
  // 🧾 CURRENT SESSION
  // ===============================
  async getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) return null;
    return data.session;
  }

  // ===============================
  // 🔁 AUTH STATE LISTENER (CLEAN)
  // ===============================
  onAuthChange(callback) {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        callback(session?.user || null);
      }
    );

    // IMPORTANT: return unsubscribe function
    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }

  // ===============================
  // 🔄 PASSWORD RESET
  // ===============================
  async resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) throw new Error(error.message);
    return true;
  }

  // ===============================
  // 🔐 UPDATE PASSWORD
  // ===============================
  async updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) throw new Error(error.message);
    return true;
  }

  // ===============================
  // 🧹 FORCE LOGOUT (FAILSAFE)
  // ===============================
  async forceLogout() {
    try {
      await this.signOut();
    } catch {
      console.warn("ManifiX: force logout fallback executed");
    }
  }
}

// 🔒 SINGLETON
const authService = new AuthService();
export default authService;
