<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <section
    class="fixed inset-0 overflow-hidden"
    aria-labelledby="slide-over-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="absolute inset-0 overflow-hidden">
      <!--
      Background overlay, show/hide based on slide-over state.

      Entering: "ease-in-out duration-500"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in-out duration-500"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition
        enter-active-class="ease-in-out duration-500"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <!-- @todo this transition isn't working, should ideally increase opacity on panel open -->
        <div
          class="absolute inset-0 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>
      <div class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      -->
        <transition
          enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          enter-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div
            class="relative w-screen max-w-md"
            v-if="$store.getters.panelOpen"
          >
            <!--
          Close button, show/hide based on slide-over state.

          Entering: "ease-in-out duration-500"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-500"
            From: "opacity-100"
            To: "opacity-0"
        -->
            <transition
              enter-active-class="ease-in-out duration-500"
              enter-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="ease-in-out duration-500"
              leave-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4"
                @click="closePanel"
              >
                <button
                  class="rounded-md text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span class="sr-only">Close panel</span>
                  <!-- Heroicon name: outline/x -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </transition>

            <!-- panel data -->
            <div
              class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
            >
              <div class="px-4 sm:px-6">
                <h2
                  class="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Token Metadata
                </h2>
                <span>
                  Contract:
                  <a
                    class="font-mono text-xs border-dashed border-b-1 border-gray-600 cursor-pointer"
                    :href="contractAddressLink"
                    target="_new"
                  >
                    {{ contractNetwork.address }}
                  </a>
                </span>
              </div>
              <div class="mt-6 relative flex-1 px-4 sm:px-6">
                <!-- Replace with your content -->
                <div class="absolute inset-0 px-4 sm:px-6">
                  <div
                    class="h-full border-2 border-dashed border-gray-200"
                    aria-hidden="true"
                  >
                    <code class="block whitespace-pre overflow-x-scroll">
                      <pre>{{ JSON.stringify(metadata, null, 2) }} </pre>
                    </code>
                  </div>
                </div>
                <!-- /End replace -->
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
const axios = require("axios");
const contractAssets = require("../assets/contract");
const contractNetwork = contractAssets[contractAssets.active];
export default {
  data: () => {
    return {
      metadata: {},
      contractNetwork,
      contractAddressLink: contractNetwork.addressLink.replace(
        "<address>",
        contractNetwork.address
      )
    };
  },
  watch: {
    "$store.state.token": async function() {
      console.log(
        "sending req,",
        "https://testing-gift-api.herokuapp.com/gift/raw/",
        this.$store.getters.token
      );
      let r = await axios.get(
        "https://testing-gift-api.herokuapp.com/gift/raw/" +
          this.$store.getters.token
      );
      this.$data.metadata = r.data;
    }
  },
  methods: {
    closePanel: async function() {
      this.$store.commit("togglePanel", false);
    },
    openPanel: async function() {
      this.$store.commit("togglePanel", true);
    }
  }
};
</script>
