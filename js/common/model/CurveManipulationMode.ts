// Copyright 2020-2023, University of Colorado Boulder

/**
 * CurveManipulationMode is an enumeration of the possible 'modes' for manipulating curves.
 *
 * When the user drags on a TransformedCurve, the curve is manipulated based on the current CurveManipulationMode,
 * allowing the user to create custom curves. The documentation in this file is not exhaustive and does not describe
 * the algorithms for responses to curve user-manipulation. Please also see TransformedCurve.js
 *
 * @author Brandon Li
 * @author Martin Veillette
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import calculusGrapher from '../../calculusGrapher.js';

export default class CurveManipulationMode extends EnumerationValue {

  // Prefix used for tandems related to a CurveManipulationMode
  public readonly tandemPrefix: string;

  // Determines visibility of the width slider
  public readonly hasAdjustableWidth: boolean;

  // Enumeration values
  public static readonly HILL = new CurveManipulationMode( 'hill' );
  public static readonly TRIANGLE = new CurveManipulationMode( 'triangle' );
  public static readonly PEDESTAL = new CurveManipulationMode( 'pedestal' );
  public static readonly PARABOLA = new CurveManipulationMode( 'parabola' );
  public static readonly SINUSOID = new CurveManipulationMode( 'sinusoid' );
  public static readonly FREEFORM = new CurveManipulationMode( 'freeform', false );
  public static readonly TILT = new CurveManipulationMode( 'tilt', false );
  public static readonly SHIFT = new CurveManipulationMode( 'shift', false );

  public static readonly enumeration = new Enumeration( CurveManipulationMode );

  public constructor( tandemPrefix: string, hasAdjustableWidth = true ) {
    super();
    this.tandemPrefix = tandemPrefix;
    this.hasAdjustableWidth = hasAdjustableWidth;
  }
}

calculusGrapher.register( 'CurveManipulationMode', CurveManipulationMode );
