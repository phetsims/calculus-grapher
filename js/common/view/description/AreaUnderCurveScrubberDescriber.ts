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

const ACCESSIBLE_OBJECT_RESPONSE_STRINGS = CalculusGrapherFluent.a11y.areaUnderCurveTool.accessibleObjectResponse;

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
    return ACCESSIBLE_OBJECT_RESPONSE_STRINGS.pattern.format( {
      xPhrase: this.getXPhrase(),
      integralPhrase: this.getIntegralPhrase(),
      areaPhrase: this.getAreaPhrase()
    } );
  }

  /**
   * Gets the phrase that describes the scrubber's position along the horizontal axis.
   */
  private getXPhrase(): string {
    return ACCESSIBLE_OBJECT_RESPONSE_STRINGS.xPhrase.format( {
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
      integralPhrase = ACCESSIBLE_OBJECT_RESPONSE_STRINGS.integralPhrase.integralValue.format( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty.value,
        value: toFixedNumber( this.areaUnderCurveScrubber.integralCurvePointProperty.value.y, CalculusGrapherConstants.Y_DESCRIPTION_DECIMALS )
      } );
    }
    else {
      // hidden
      integralPhrase = ACCESSIBLE_OBJECT_RESPONSE_STRINGS.integralPhrase.integralHiddenStringProperty.value;
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
        areaPhrase = ACCESSIBLE_OBJECT_RESPONSE_STRINGS.areaPhrase.areaZeroValueStringProperty.value;
      }
      else if ( area > 0 ) {
        // positive
        areaPhrase = ACCESSIBLE_OBJECT_RESPONSE_STRINGS.areaPhrase.areaPositiveValue.format( {
          absoluteValue: toFixedNumber( Math.abs( area ), CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS )
        } );
      }
      else {
        // negative
        areaPhrase = ACCESSIBLE_OBJECT_RESPONSE_STRINGS.areaPhrase.areaNegativeValue.format( {
          absoluteValue: toFixedNumber( Math.abs( area ), CalculusGrapherConstants.AREA_DESCRIPTION_DECIMALS )
        } );
      }
    }
    else {
      // hidden
      areaPhrase = ACCESSIBLE_OBJECT_RESPONSE_STRINGS.areaPhrase.areaHiddenStringProperty.value;
    }
    return areaPhrase;
  }
}

calculusGrapher.register( 'AreaUnderCurveScrubberDescriber', AreaUnderCurveScrubberDescriber );