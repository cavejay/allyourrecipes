<template>
  <nav
    class="navbar is-fixed-top is-primary"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <nuxt-link class="navbar-item" to="/">
        <img
          src="~/assets/img/Aybabtu.small.png"
          alt="allyourbase"
          width="28"
        />
      </nuxt-link>

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
        <nuxt-link class="navbar-item" to="/">
          Home
        </nuxt-link>
        <a class="navbar-item">
          <b-field>
            <b-input
              placeholder="Search..."
              type="search"
              icon="magnify"
              custom-class="is-rounded"
            >
            </b-input>
            <!-- <p class="control">
              <button class="button is-primary ">Search</button>
            </p> -->
          </b-field>
        </a>
        <nuxt-link class="navbar-item" to="/browse">
          Browse
        </nuxt-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <nuxt-link class="navbar-item" to="/about">
              About
            </nuxt-link>
            <nuxt-link class="navbar-item" to="/contact">
              Contact
            </nuxt-link>
            <hr class="navbar-divider" />
            <a
              href="https://github.com/cavejay/allyourrecipes/issues/new"
              class="navbar-item"
            >
              Report an issue
            </a>
          </div>
        </div>
        <nuxt-link class="navbar-item" to="/recipes/new">
          New Recipe
        </nuxt-link>
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
