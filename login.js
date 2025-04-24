
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;

  const hashedPassword = await sha256(password);
  google.script.run.withSuccessHandler(function(role) {
    if (role === "Admin") window.location.href = "adminPanel.html";
    else if (role === "User") window.location.href = "userPanel.html";
    else document.getElementById("error-msg").innerText = "Invalid credentials.";
  }).login(username, hashedPassword);
});

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
