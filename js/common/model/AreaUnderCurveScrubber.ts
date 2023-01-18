// Copyright 2023, University of Colorado Boulder

/**
 * AreaUnderCurveScrubber is the model element for the area-under-curve tool.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import AncillaryTool, { AncillaryToolOptions } from './AncillaryTool.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import Curve from './Curve.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import { Color, ProfileColorProperty } from '../../../../scenery/js/imports.js';
import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';

type SelfOptions = EmptySelfOptions;

type AreaUnderCurveToolOptions = SelfOptions & PickRequired<AncillaryToolOptions, 'tandem'>;

export default class AreaUnderCurveScrubber extends AncillaryTool {

  public readonly colorProperty: ProfileColorProperty;
  public readonly positiveFillProperty: ReadOnlyProperty<Color>;
  public readonly negativeFillProperty: ReadOnlyProperty<Color>;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    providedOptions: AreaUnderCurveToolOptions ) {

    const options = optionize<AreaUnderCurveToolOptions, SelfOptions, AncillaryToolOptions>()( {

      // AncillaryToolOptions
      x: CalculusGrapherConstants.CURVE_X_RANGE.min
    }, providedOptions );

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, options );

    this.colorProperty = CalculusGrapherColors.integralCurveStrokeProperty;
    this.positiveFillProperty = CalculusGrapherColors.integralPositiveFillProperty;
    this.negativeFillProperty = CalculusGrapherColors.integralNegativeFillProperty;

    this.addLinkedElement( this.colorProperty, {
      tandem: options.tandem.createTandem( 'colorProperty' ),
      phetioDocumentation: 'Color for the scrubber.'
    } );

    this.addLinkedElement( this.positiveFillProperty, {
      tandem: options.tandem.createTandem( 'positiveFillProperty' ),
      phetioDocumentation: 'Color for positive area in the area plot, and in the "Net Signed Area" accordion box.'
    } );

    this.addLinkedElement( this.negativeFillProperty, {
      tandem: options.tandem.createTandem( 'negativeFillProperty' ),
      phetioDocumentation: 'Color for negative area in the area plot, and in the "Net Signed Area" accordion box.'
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubber', AreaUnderCurveScrubber );
