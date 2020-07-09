// Copyright 2020, University of Colorado Boulder

/**
 * Factory for creating the various icons that appear in the 'Calculus Grapher' simulation. All methods are static.
 *
 * CalculusGrapherIconFactory currently creates the following icons:
 *   - Screen Icons
 *   - Curve Manipulation Icons
 *
 *
 * NOTE: All 'magic' numbers in this file were tentatively determined empirically to match the design document.
 *
 * @author Brandon Li
 */

import calculusGrapher from '../../calculusGrapher.js';

const CalculusGrapherIconFactory = {


  /*--------------------------- Screen Icons ---------------------------------*/


  /*---------------------- Curve Manipulation Icons --------------------------*/







  // *
  //  * Creates the center-of-mass icon, which is placed next to a checkbox to toggle the visibility of the center-of-mass.
  //  * @public
  //  * @param {Object} [options]
  //  * @returns {Node}

  // createCenterOfMassIcon( options ) {

  //   options = merge( {
  //     lineWidth: 1,
  //     length: 15,
  //     legThickness: 3.3
  //   }, options );

  //   return new XNode( options );
  // }
};

calculusGrapher.register( 'CalculusGrapherIconFactory', CalculusGrapherIconFactory );
export default CalculusGrapherIconFactory;