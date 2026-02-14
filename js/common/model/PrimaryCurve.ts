// Copyright 2026, University of Colorado Boulder

/**
 * PrimaryCurve is the f curve. This class is provided mainly for type checking.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import TransformedCurve from './TransformedCurve.js';

export default class PrimaryCurve extends TransformedCurve {

  public constructor( tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioDocumentation: 'The curve that corresponds to the primary function, f(x) or f(t)'
    } );
  }
}

calculusGrapher.register( 'PrimaryCurve', PrimaryCurve );