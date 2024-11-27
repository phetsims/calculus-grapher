// Copyright 2023-2024, University of Colorado Boulder

/**
 * AreaUnderCurveScrubber is the model element for the area-under-curve scrubber. It can be moved horizontally,
 * and the accumulated area (or 'net signed area') is the area between x=0 and the scrubber's x position.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ReadOnlyProperty from '../../../../axon/js/ReadOnlyProperty.js';
import { Color, ProfileColorProperty } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherColors from '../CalculusGrapherColors.js';
import CalculusGrapherConstants from '../CalculusGrapherConstants.js';
import AncillaryTool from './AncillaryTool.js';
import Curve from './Curve.js';

export default class AreaUnderCurveScrubber extends AncillaryTool {

  // Color for the scrubber handle, vertical line, and 'accumulation line'
  public readonly colorProperty: ProfileColorProperty;

  // Color used to fill the area that is above x=0
  public readonly positiveFillProperty: ReadOnlyProperty<Color>;

  // Color used to fill the area that is below x=0
  public readonly negativeFillProperty: ReadOnlyProperty<Color>;

  public constructor(
    integralCurve: Curve,
    originalCurve: Curve,
    derivativeCurve: Curve,
    secondDerivativeCurve: Curve,
    tandem: Tandem ) {

    super( integralCurve, originalCurve, derivativeCurve, secondDerivativeCurve, {

      // Close to zero, but not at zero, so that the scrubber is noticeable.
      // See https://github.com/phetsims/calculus-grapher/issues/207#issuecomment-1434759100
      x: CalculusGrapherConstants.CURVE_X_RANGE.min + CalculusGrapherConstants.CURVE_X_RANGE.getLength() / 50,

      // Do not feature derivatives in Studio, because they are not relevant for area-under-curve,
      // see https://github.com/phetsims/calculus-grapher/issues/225
      yDerivativePropertyFeatured: false,
      ySecondDerivativePropertyFeatured: false,
      tandem: tandem
    } );

    this.colorProperty = CalculusGrapherColors.integralCurveStrokeProperty;
    this.positiveFillProperty = CalculusGrapherColors.integralPositiveFillProperty;
    this.negativeFillProperty = CalculusGrapherColors.integralNegativeFillProperty;

    this.addLinkedElement( this.colorProperty, {
      tandemName: 'colorProperty'
    } );

    this.addLinkedElement( this.positiveFillProperty, {
      tandemName: 'positiveFillProperty'
    } );

    this.addLinkedElement( this.negativeFillProperty, {
      tandemName: 'negativeFillProperty'
    } );

    this.addLinkedElement( this.yIntegralProperty, {
      tandemName: 'areaUnderCurveProperty'
    } );
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubber', AreaUnderCurveScrubber );