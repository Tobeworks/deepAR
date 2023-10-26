import * as deepar from "deepar";
import Carousel from "./carousel.js";

// Log the version. Just in case.
//console.log("Deepar version: " + deepar.version);

// Top-level await is not supported.
// So we wrap the whole code in an async function that is called immediatly.
(async function () {
  // Get the element you want to place DeepAR into. DeepAR will inherit its width and height from this and fill it.
  const previewElement = document.getElementById("ar-screen");

  // trigger loading progress bar animation
  const loadingProgressBar = document.getElementById("loading-progress-bar");
  loadingProgressBar.style.width = "100%";

  // All the effects are in the public/effects folder.
  // Here we define the order of effect files.
  const effectList = [
    "effects/catrice-mask2.deepar",
    "effects/catrice-mask3.deepar",
    "effects/catrice-mask4.deepar",
    // "effects/catrice-mask4.deepar",
  ];

  let deepAR = null;

  // Initialize DeepAR with an effect file.
  try {
    deepAR = await deepar.initialize({
      licenseKey: "68d8e3d96d52a1762ebeb697e661cbe658bef5fd3e02f61503cf1323f262ad73eff23f7ff5b2ff72",
      previewElement,
      effect: effectList[0],
      // Removing the rootPath option will make DeepAR load the resources from the JSdelivr CDN,
      // which is fine for development but is not recommended for production since it's not optimized for performance and can be unstable.
      // More info here: https://docs.deepar.ai/deepar-sdk/deep-ar-sdk-for-web/download-optimizations#custom-deployment-of-deepar-web-resources
      rootPath: "./deepar-resources",
      additionalOptions: {
        cameraConfig: {
          // facingMode: 'environment'  // uncomment this line to use the rear camera
        },
      },
    });
  } catch (error) {
    console.error(error);
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("permission-denied-screen").style.display = "block";
    return;
  }

  // Hide the loading screen.
  document.getElementById("loading-screen").style.display = "none";
  document.getElementById("ar-screen").style.display = "block";

  window.effect = effectList[0];

  const glassesCarousel = new Carousel("carousel");
  glassesCarousel.onChange = async (value) => {
    const loadingSpinner = document.getElementById("loading-spinner");

    if (window.effect !== effectList[value]) {
      loadingSpinner.style.display = "block";
      await deepAR.switchEffect(effectList[value]);
      window.effect = effectList[value];
    }
    loadingSpinner.style.display = "none";
  };


  // const UTAG_DATA_OBJECT_META_ID = 'utag-data-object';
  // const UTAG_DATA_OBJECT = '_utagDataObject';


  // const addUtagDataObjectMetaTag = () => {

  //   const utag_data = {
  //     tealium_scope: 'medium_1',
  //     site_country: 'DE',
  //     site_language: 'de',

  //   };

  //   const current = document.getElementById(UTAG_DATA_OBJECT_META_ID);
  //   const meta = document.createElement('meta');

  //   meta.name = UTAG_DATA_OBJECT;
  //   meta.content = JSON.stringify(utag_data);

  //   if (!current) {
  //     meta.id = UTAG_DATA_OBJECT_META_ID;
  //     document.head.appendChild(meta);
  //   }

  //}

  // addUtagDataObjectMetaTag();


  // utag.track('view', {
  //   site_brand: 'catrice',
  //   site_country: 'DE',
  //   site_language: 'de',
  //   currency_code: 'EUR',
  //   logged_in_status: false,
  //   page_name: 'metaface.catrice.eu',
  //   data_source: 'FEdataLayer',
  //   tealium_scope: 'explicited',
  // })

  // if (/iP(ad|hone|od).+Version\/[\d.]+.*Safari/.test(navigator.userAgent)) {
  //   document.body.classList.add('ios-safari');
  // }

  // if (/iP(ad|hone|od).*CriOS/.test(navigator.userAgent)) {
  //   document.body.classList.add('ios-chrome');
  // }


  function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  window.addEventListener('resize', setVH);
  setVH();

  // console.log(ConsentStore)
  // const addEventListeners = () => {
  //   if (!window.__cmp) return false;

  //   const { consentapproved, consentrejected, consentcustom } = ConsentStore.get().handlersSet;

  //   const consentapprovedSet =
  //     consentapproved || window.__cmp('addEventListener', ['consentapproved', onConsentChange, false], null);
  //   const consentrejectedSet =
  //     consentrejected || window.__cmp('addEventListener', ['consentrejected', onConsentChange, false], null);
  // }
  // addEventListeners();
})();
