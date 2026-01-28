// Copyright 2026, University of Colorado Boulder

/**
 * AreaUnderCurveScrubberDescriber creates accessible responses for the Area Under Curve scrubber.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import AreaUnderCurveScrubber from '../../model/AreaUnderCurveScrubber.js';

export default class AreaUnderCurveScrubberDescriber {

  public constructor( private readonly areaUnderCurveScrubber: AreaUnderCurveScrubber,
                      private readonly integralCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      private readonly primaryCurveLayerVisibleProperty: TReadOnlyProperty<boolean>
  ) {
    // All fields are defined and initialized via constructor params.
  }

  /**
   * Gets the accessible object response that describes the scrubber's position and what its vertical line intersects.
   */
  public getAccessibleObjectResponse(): string {
    return CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.pattern.format( {
      xPhrase: this.getXPhrase(),
      integralPhrase: this.getIntegralPhrase(),
      areaPhrase: this.getAreaPhrase()
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's position along the horizontal axis.
   */
  private getXPhrase(): string {
    return CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.xPhrase.format( {
      variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
      value: toFixedNumber( this.areaUnderCurveScrubber.xProperty.value, CalculusGrapherConstants.X_DESCRIPTION_DECIMALS )
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's intersection with the integral graph.
   * The integral is described as a y-value or hidden.
   */
  private getIntegralPhrase(): string {
    let integralPhrase: string;
    if ( this.integralCurveLayerVisibleProperty.value ) {
      // y-value
      integralPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.integralValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      integralPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.integralHiddenStringProperty.value;
    }
    return integralPhrase;
  }

  /**
   * Gets the phrase that describes the area under the primary curve from 0 to the scrubber's position.
   * Area is described as zero, positive, negative, or hidden.
   */
  private getAreaPhrase(): string {
    let areaPhrase: string;
    if ( this.primaryCurveLayerVisibleProperty.value ) {
      const area = this.areaUnderCurveScrubber.integralCurvePointProperty.value.y;
      if ( area === 0 ) {
        // zero
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.areaZeroValueStringProperty.value;
      }
      else if ( area > 0 ) {
        // positive
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.areaPositiveValue.format( {
          absoluteValue: toFixedNumber( Math.abs( area ), CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS )
        } );
      }
      else {
        // negative
        areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.areaNegativeValue.format( {
          absoluteValue: toFixedNumber( Math.abs( area ), CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      areaPhrase = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse.phrases.areaHiddenStringProperty.value;
    }
    return areaPhrase;
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubberDescriber', AreaUnderCurveScrubberDescriber );