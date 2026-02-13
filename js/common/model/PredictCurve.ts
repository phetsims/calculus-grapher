// Copyright 2026, University of Colorado Boulder

/**
 * PredictCurve is the curve used to predict the primary curve. This class is provided mainly for type checking.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurve from './TransformedCurve.js';

export default class PredictCurve extends TransformedCurve {

  public constructor( tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioDocumentation: 'The curve that corresponds to the student\'s prediction of the original function'
    } );
  }
}

calculusGrapher.register( 'PredictCurve', PredictCurve );