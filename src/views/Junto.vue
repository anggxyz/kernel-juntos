<template>
  <div>
    <div class="max-w-3xl mx-auto px-2 pt-6">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center">
          <div class="flex items-center justify-center flex-grow">
            <!-- <div class="px-3">KERNEL Juntos</div> -->
            <img
              class="inline w-36 p-5 mr-2 sm:w-36 sm:mr-12"
              src="../assets/logo.png"
            />
            <div class="text-base sm:px-3 font-serif sm:text-3xl italic">
              Spark a thought. Start a Junto.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
    <div v-else>
      <div
        class="container max-w-3xl mx-auto mb-14 my-6 px-14 py-14 sm:bg-gray-100 sm:shadow-xl sm:rounded-3xl"
      >
        <div>
          <div>
            <span class="font-serif sm:text-5xl text-4xl">
              {{ event.title }}
            </span>
            <!-- <span class="font-fancy text-gray-400 text-lg">
              fancy a
              <span class="tweet-link">
                <a :href="tweetText" target="_new" class="text-blue-400"
                  >tweet <font-awesome-icon :icon="['fab', 'twitter']"
                /></a>
                ?
              </span>
            </span> -->
          </div>
          <div
            class="leading-none text-gray-600 tracking-tight font-extralight"
          >
            {{ event.date_time_event }}
          </div>
          <div
            class="font-sans whitespace-pre-line mt-5 text-lg"
            v-html="event.description"
            v-linkified
          >
            <!-- {{ event.description }} -->
          </div>
          <div class="mt-12 font-bold">
            Proposer:
            <span class="font-normal">
              {{ event.creator }}
            </span>
          </div>
          <div class="font-bold">
            Date & time:
            <span class="font-normal">
              {{ event.date_time_event }}
            </span>
          </div>
          <div class="font-bold" v-if="event.seats_available > 0">
            Seats Available:
            <span class="font-normal">
              {{ event.seats_available }}
            </span>
          </div>
          <!-- <form class="mt-12"> -->
          <div v-if="event.seats_available == 0" class="mt-12">
            <p>No seats available for this Junto.</p>
          </div>
          <div v-else>
            <div v-if="udatingAttendees">
              <div class="spinner rsvp">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
              </div>
            </div>
            <div v-else-if="!updatingAttendees && !rsvp_done" class="mt-12">
              <input
                class="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent shadow-lg"
                placeholder="Your email"
                v-model="rsvp_email"
              />
              <button
                class="shadow-2xl border-transparent bg-purple-600 px-4 py-2 text-white rounded-lg m-3 hover:bg-purple-900"
                v-on:click="rsvp"
              >
                RSVP
              </button>
            </div>
            <div v-else-if="rsvp_done" class="mt-12">
              <p>RSVP confirmed. You have been added to the calendar invite.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var Airtable = require("airtable");
var base = new Airtable({ apiKey: "keyikLX5gMBzRzgbC" }).base(
  "appykKj45Eb2Ql8jU"
);
const table = "Juntos";

export default {
  props: {
    recordId: String
  },
  data: () => {
    return {
      loading: true,
      event: {
        date_time_event: "",
        description: "",
        title: "",
        creator: "",
        attendees: "",
        seats_available: 0
      },
      rsvp_email: "",
      udatingAttendees: false,
      rsvp_done: false,
      tweetText: ""
    };
  },
  created: async function() {
    let r;
    try {
      r = await base(table).find(this.$props.recordId);
    } catch (err) {
      console.log("error in finding record", err);
    }
    this.$data.loading = false;
    if (r) {
      const title = r.fields["Title"];
      const creator = r.fields["Creator's Name"];
      const date_time = r.fields["Start"];
      const description = r.fields["Description"];
      const limit = r.fields["Limit"];
      const attendees = r.fields["Attendees"];

      let seats_available = limit - (attendees.split(",").length - 1);
      if (seats_available <= 0) seats_available = 0;

      if (limit == 0) seats_available = -1;

      console.log(r.fields);

      let d = new Date(date_time);
      let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
      let month = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
      let date = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
      let time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(
        d
      );
      // let timezone = " "
      // let timezone = new Intl.DateTimeFormat("en", { timeZone: "long" });
      console.log("datetime:", d);

      let date_time_event = date + " " + month + ", " + year + " " + time + " ";
      this.$data.event = {
        title,
        creator,
        date_time_event,
        description,
        seats_available
      };

      let tweet =
        "RSVP'd for a junto at @kernel0x. Check it out here: https://juntos.kernel.community" +
        this.$route.fullPath;
      this.$data.tweetText =
        "http://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet);
    }
  },
  methods: {
    rsvp: async function() {
      let r;
      try {
        r = await base(table).find(this.$props.recordId);
      } catch (err) {
        console.log("error in finding record", err);
      }
      if (r) {
        this.$data.event.attendees = r.fields["Attendees"];
        this.$data.udatingAttendees = true;
        let _attendees;
        if (this.$data.event.attendees) {
          _attendees =
            this.$data.event.attendees + ", " + this.$data.rsvp_email;
        } else {
          _attendees = this.$data.rsvp_email;
        }
        try {
          await base(table).update([
            {
              id: this.$props.recordId,
              fields: {
                Attendees: _attendees
              }
            }
          ]);
          this.$data.rsvp_done = true;
        } catch (err) {
          console.log("error in updating", err);
        }
      }
      this.$data.udatingAttendees = false;
      this.$data.rsvp_email = "";
    }
  }
};
</script>
