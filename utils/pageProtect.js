export const redirectToPage = async (status, session, router) => {
    if (status === "authenticated" && session?.user) {
      try {
        const response = await fetch(`/api/user-profile/${session.user.id}/user`);
        const { UserProfiles } = await response.json();
        if (Array.isArray(UserProfiles) && UserProfiles.length === 0) {
          router.replace("/user-profile"); // Redirect new user to user-profile page
        } else {
          router.replace("/explore"); // Redirect existing user to explore page
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.replace("/user-profile"); // Redirect in case of error
      }
    } else if (status === "unauthenticated") {
      router.replace("/"); // Redirect user to home page if not authenticated
    }
  };