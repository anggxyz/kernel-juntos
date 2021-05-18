<template>
  <div>
    <div class="max-w-3xl mx-auto px-2 pt-6">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center">
          <div class="flex items-center justify-center flex-grow">
            <!-- <div class="px-3">KERNEL Juntos</div> -->
            <img class="inline w-36 mr-12" src="../assets/logo.png" />
            <div class="px-3 font-serif text-3xl italic">
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
        class="container max-w-3xl mx-auto mb-14 my-6 px-14 py-14 bg-gray-100 shadow-xl rounded-3xl"
      >
        <div class="font-sans text-xl mt-5">
          To schedule a Junto, submit the form linked in the
          <a href="">KERNEL Block III</a> Explorer. All scheduled juntos are
          dropped in
          <a href="https://app.slack.com/client/T016DS66R99/C016JL4385C"
            >#kernel-juntos</a
          >
          channel on Slack.
          <br /><br />
          <center class="text-5xl">☕️</center>
          <br />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>
