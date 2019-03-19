<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <a class="navbar-item" href="https://localhost:3000">
        <img
          src="~/assets/img/Aybabtu.small.png"
          alt="allyourbase"
          width="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Search (Put a search thing here)
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider" />
            <a
              href="https://github.com/cavejay/allyourrecipes/issues/new"
              class="navbar-item"
            >
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              Login / Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- <section class="hero is-dark is-bold is-small">
    <div class="hero-body">
      <div class="container">
        <nuxt-link class="title has-text-white" to="/">
          All Your Recipes
        </nuxt-link>
        <img
          src="~/assets/img/Aybabtu.small.png"
          alt="allyourbase"
          height="42"
          width="42"
        />
      </div>
    </div>
  </section> -->
</template>

<script>
export default {
  mounted() {
    if (process.browser) {
      window.onNuxtReady(() => {
        document.addEventListener("DOMContentLoaded", () => {
          // Get all "navbar-burger" elements
          const $navbarBurgers = Array.prototype.slice.call(
            document.querySelectorAll(".navbar-burger"),
            0
          );
          // Check if there are any navbar burgers
          if ($navbarBurgers.length > 0) {
            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
              el.addEventListener("click", () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle("is-active");
                $target.classList.toggle("is-active");
              });
            });
          }
        });
      });
    }
  }
};
</script>
