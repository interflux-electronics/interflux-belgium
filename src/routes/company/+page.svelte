<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';
  import { markdown } from '$lib/helpers';
  import { Button } from '$lib/components';
  import ResponsiveVideo from '$lib/components/ResponsiveVideo.svelte';

  let count = $derived(new Date().getFullYear() - 1980);
</script>

<section id="iso">
  <div class="liner">
    <div class="text">
      <h2>{m.company_iso_h({ count })}</h2>
      {@html markdown(m.company_iso_p({ count }))}
    </div>
    <img class="daniel" src="{cdnHost}/images/legacy/daniel-werkhoven.jpg" alt="Daniel Werkhoven" />
  </div>
</section>

<section id="pioneer">
  <div class="liner">
    <img src="{cdnHost}/images/legacy/img-pioneer.jpg" alt="pioneer boy" />
    <div class="text">
      <h2>{m.company_pioneer_h()}</h2>
      {@html markdown(m.company_pioneer_p())}
    </div>
  </div>
</section>

<section id="durable">
  <div class="liner">
    <div class="text">
      <h2>{m.company_durable_h()}</h2>
      {@html markdown(m.company_durable_p())}
    </div>
    <img src="{cdnHost}/images/legacy/img-durable.jpg" alt="hands holding a tree" />
  </div>
</section>

<section id="video">
  <div class="liner">
    <ResponsiveVideo
      path="videos/our-journey-towards-sustanability/our-journey-towards-sustanability"
      variations="@1920x1080.mp4,@1920x1080.webm,@1920x1080.ogg,@800x449.jpg"
    />
  </div>
</section>

<section id="support">
  <div class="liner">
    <img src="{cdnHost}/images/legacy/img-support.jpg" alt="electronics circuit" />
    <div class="text">
      <h2>{m.company_support_h()}</h2>
      {@html markdown(m.company_support_p())}
    </div>
  </div>
</section>

<section id="iso2">
  <div class="liner">
    <div class="text">
      <h2>{m.iso_9001_compliant()}</h2>
    </div>
    <img
      src="{cdnHost}/images/public/Vinc_otte-Stickers_CERT_v3_ISO9001.png"
      alt="Vincotte ISO9001"
    />
  </div>
</section>

<section id="presentation">
  <div class="liner">
    <p>{m.keen_to_learn_more()}</p>
    <Button
      label={m.open_slide_deck()}
      size="large"
      theme="primary green"
      url="{cdnHost}/documents/presentations/Interflux-company-2023-EN.pdf"
    />
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #iso,
  #pioneer,
  #durable,
  #support,
  #iso2 {
    .liner {
      display: flex;
      @include tablet {
        padding: 0 5vw;
        flex-direction: column;
      }
      @include mobile {
        flex-direction: column;
        padding: 10vw 5vw;
      }
      max-width: 900px;
      justify-content: space-between;
      align-items: center;
      > * + * {
        @include widescreen {
          margin-left: px(4.1666vw);
        }
        @include desktop {
          margin-left: 4.1666vw;
        }
      }
    }
    & + section {
      @include widescreen {
        margin-top: px(8.333vw);
      }
      @include desktop {
        margin-top: 8.333vw;
      }
    }
    img {
      @include tablet {
        max-width: 100vw;
        height: auto;
      }
      @include mobile {
        max-width: 100vw;
        height: auto;
      }
    }
    .text {
      :global {
        h2 {
          font-family: var(--extra-bold);
          line-height: 150%;
          @include widescreen {
            margin-bottom: px(1.666vw);
          }
          @include desktop {
            margin-bottom: 1.666vw;
          }
          @include tablet {
            margin: 0 0 3vw;
            font-size: 3.5vw;
          }
          @include mobile {
            margin: 0 0 9vw;
            font-size: 7vw;
          }
        }
        p {
          @include paragraph;
        }
      }
    }
  }

  #iso {
    @include widescreen {
      margin-top: px(8.333vw);
    }
    @include desktop {
      margin-top: 8.333vw;
    }
    @include tablet {
      margin-top: 14vw;
    }
    @include mobile {
      margin-top: 41vw;
    }
    .liner {
      position: relative;
      background: var(--blue-3);
      @include widescreen {
        padding: px(4.1666vw);
        min-height: 261px;
      }
      @include desktop {
        padding: 4.1666vw;
        min-height: vw(261px);
      }
      @include tablet {
        padding: 5vw 40vw 5vw 5vw;
      }
      @include mobile {
        padding-top: 80vw;
        padding-bottom: 80vw;
      }
      :global {
        h2,
        p {
          color: white;
        }
      }
      img {
        position: absolute;
        :global {
          &.label {
            @include widescreen {
              top: -24px;
              right: 210px;
            }
            @include desktop {
              top: -24px;
              right: 210px;
            }
            @include tablet {
              width: 20vw;
              top: -3.1vw;
              right: 7vw;
            }
            @include mobile {
              width: 40vw;
              top: -6.2vw;
              right: 32vw;
            }
          }
        }
        &.daniel {
          border: 5px solid #fff;
          box-shadow: 0 2px 4px RGBA(0, 0, 0, 0.3);
          @include widescreen {
            top: px(3.8333vw);
            right: px(-0.833vw);
          }
          @include desktop {
            top: 3.8333vw;
            right: -0.833vw;
          }
          @include tablet {
            right: 4vw;
            bottom: -8vw;
          }
          @include mobile {
            right: 8vw;
            bottom: -6vw;
          }
        }
      }
      .text {
        @include widescreen {
          max-width: 60%;
        }
        @include desktop {
          max-width: 60%;
        }
      }
    }
  }

  #pioneer {
    .liner {
      @include tablet {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
      }
      .text {
        @include tablet {
          width: 60%;
        }
      }
      img {
        @include tablet {
          margin: 9vw 0 -3vw;
        }
        @include mobile {
          margin: 10vw 0 -5vw;
        }
      }
    }
  }

  #durable {
    img {
      @include tablet {
        align-self: flex-end;
        transform: translateX(5vw);
        margin-bottom: -3vw;
        margin-top: -30vw;
      }
      @include mobile {
        align-self: flex-end;
        transform: translateX(5vw);
        margin-bottom: 9vw;
      }
    }
    .liner {
      @include tablet {
        display: flex;
        flex-direction: column-reverse;
      }
      @include mobile {
        display: flex;
        flex-direction: column-reverse;
      }
    }
  }

  #support {
    img {
      @include tablet {
        margin: 10vw 0 5vw;
      }
      @include mobile {
        margin-bottom: 9vw;
        width: 100%;
      }
    }
  }

  #iso2 {
    img {
      max-width: 100%;
    }
  }

  #presentation {
    @include widescreen {
      margin-bottom: 150px;
    }
    @include desktop {
      margin-bottom: vw(150px);
    }
    @include tablet {
      margin-bottom: 10vw;
    }
    @include mobile {
      margin-bottom: 10vw;
    }
    .liner {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      :global {
        p {
          @include widescreen {
            margin-bottom: 20px;
          }
          @include desktop {
            margin-bottom: vw(20px);
          }
          @include tablet {
            margin: 8vw 0 4vw;
          }
          @include mobile {
            margin-bottom: 10vw;
          }
        }
      }
    }
  }

  #video {
    .liner {
      max-width: 900px;
      margin-bottom: 100px;
    }
  }
</style>
