/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
Shopify.theme.jsRecommendedProducts = {
  init: function($section) {

    // Add settings from schema to current object
    Shopify.theme.jsRecommendedProducts = $.extend(this, Shopify.theme.getSectionData($section));

    // Look for an element with class 'product-recommendations'
    const $productRecommendations = $section.find('.product-recommendations');

    /* NE compatibility */
    // These selectors can be removed in the new editor
    const $productRecommendationsContainer = $('[data-product-recommendations-container]');
    const $productRecommendationsBlock = $productRecommendationsContainer.closest('.block__recommended-products');
    /* Ends NE compatibility */

    /* NE compatibility
     * In the new editor, this can be removed
     * We can use this snippet to check if the element exists instead
     * if ($productRecommendations.length === 0) { return; }
    */
    // Hides product recommendations based on settings
    if (this.show_product_recommendations === false) {
      $productRecommendationsBlock.hide();
      return;
    }
    /* Ends NE compatibility */

    /* NE compatibility */
    // These can be removed in the new editor
    $('.recommended-products-section').show();
    $productRecommendationsBlock.show();
    /* Ends NE compatibility */

    // Selectors
    const productID = $productRecommendations.data('product-id');
    const limit = $productRecommendations.data('limit');
    /* NE compatibility */
    // Remove in new editor
    const sectionEnabled = $productRecommendations.data('enabled');
    /* Ends NE compatibility */

    /* NE compatibility
     * In NE, we will have a dynamic section ID that will need to be grabbed from the DOM like the other variables
     * const section ID = $productRecommendationsContainer.data('section-id');
     Ends NE compatibility */

    // If showing custom collection we do not want to build request url
    if (this.show_custom_collection) {
      this.showCustomCollection($section);
      return;
    }

    // Build request URL
    const shopURL = $productRecommendations.data('base-url');

    // For NE section ID will be pulled from the DOM
    const requestUrl = `${shopURL}?section_id=product__recommendations&product_id=${productID}&limit=${limit}`;
    //const requestUrl = `${shopURL}?section_id=${sectionID}&limit=${limit}&product_id=${productID}`;
    /* NE compatibility
     * In NE, this request url will need to be updated to reflect the dynamic section ID, 'section_id=' + sectionID
     Ends NE compatibility */

    $.ajax({
      type: 'GET',
      url: requestUrl,
      success: function(data) {
        /* NE compatibility */
        // Remove in new editor
        if (!sectionEnabled) {
          $productRecommendationsContainer.empty();
          return;
        }
        /* Ends NE compatibility */

        let $recommendedProductsElement = $(data).find('.product-recommendations').html();

        // Insert product list into the product recommendations container
        $productRecommendationsContainer.html($recommendedProductsElement);

        /* NE compatibility */
        // Remove in new editor
        $('.recommended-products-section').hide();
        /* Ends NE compatibility */

        Shopify.theme.jsProduct.relatedProducts();

        // Initialize shopify payment buttons
        if (Shopify.PaymentButton) {
          Shopify.PaymentButton.init();
        }

        /* NE Compatibility */
        // Remove in new editor
        const $product = $productRecommendationsContainer.find('.thumbnail');

        if ($product.length === 0) {
          $productRecommendationsBlock.hide();
        }
        /* Ends NE compatibility */

        // Converting the currencies
        if (Shopify.theme.currencyConverter) {
          Shopify.theme.currencyConverter.convertCurrencies();
        }
      }
    });
  },
  setupRecommendedVideoPlayer: function($section) {
    const videosInRecommendedProducts = $section.find('[data-product-recommendations-container] [data-html5-video] video, [data-product-recommendations-container] [data-youtube-video]').get();

    // Only run Plyr.setup if videosInRecommendedProducts exists
    if (videosInRecommendedProducts.length > 0) {
      videosInRecommendedProductsPlayer = Plyr.setup(videosInRecommendedProducts, {
        controls: videoControls,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: true
        },
        storage: {
          enabled: false
        }
      });
      if (videoPlayers !== null) {
        var combinedArray = videoPlayers.concat(videosInRecommendedProductsPlayer);
        videoPlayers = combinedArray;
      } else {
        videoPlayers = videosInRecommendedProductsPlayer;
      }
    }

    Shopify.theme.jsVideo.setupListeners();
  },
  showCustomCollection: function($section) {
    const $recommendedProductsElement = $section.find('.product-recommendations').html();
    /* NE compatibility */
    // Update this selector to target $('.product-recommendations') instead
    const $productRecommendationsContainer = $('[data-product-recommendations-container]');
    /* Ends NE compatibility */
    $productRecommendationsContainer.html($recommendedProductsElement);
    /* NE compatibility */
    // Remove in new editor
    $('.recommended-products-section').hide();
    /* Ends NE compatibility */
    Shopify.theme.jsProduct.relatedProducts();
  },
  unload: function($section) {
  }
}

/******/ })()
;