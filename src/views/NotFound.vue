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
        <span class="font-serif sm:text-5xl text-4xl">
          404.
        </span>
        <div class="font-sans text-xl mt-5">
          To schedule a Junto, submit the form linked in the
          <a
            href="https://www.notion.so/gitcoin/Juntos-f92ef2c9576a48e2972bc411fb13187b"
            target="_new"
            >KERNEL Block III</a
          >
          Explorer. All scheduled juntos are dropped in
          <a
            href="https://app.slack.com/client/T016DS66R99/C016JL4385C"
            target="_new"
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
