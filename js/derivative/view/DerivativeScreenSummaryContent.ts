// Copyright 2025, University of Colorado Boulder

/**
 * DerivativeScreenSummaryContent is the description screen summary for the 'Derivative' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import AccessibleListNode, { AccessibleListItem } from '../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../calculusGrapher.js';
import CalculusGrapherFluent from '../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../common/CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../common/CalculusGrapherSymbols.js';
import DerivativeModel from '../model/DerivativeModel.js';

export default class DerivativeScreenSummaryContent extends ScreenSummaryContent {

  public constructor( model: DerivativeModel,
                      showOriginalCurveProperty: TReadOnlyProperty<boolean>,
                      originalCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      derivativeCurveLayerVisibleProperty: TReadOnlyProperty<boolean> ) {

    super( {
      playAreaContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.playArea.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      controlAreaContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.controlAreaStringProperty,
      currentDetailsContent: new CurrentDetailsAccessibleListNode( model, showOriginalCurveProperty,
        originalCurveLayerVisibleProperty, derivativeCurveLayerVisibleProperty ),
      interactionHintContent: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.interactionHintStringProperty
    } );
  }
}

class CurrentDetailsAccessibleListNode extends AccessibleListNode {

  public constructor( model: DerivativeModel,
                      showOriginalCurveProperty: TReadOnlyProperty<boolean>,
                      originalCurveLayerVisibleProperty: TReadOnlyProperty<boolean>,
                      derivativeCurveLayerVisibleProperty: TReadOnlyProperty<boolean> ) {

    const leadingParagraphStringProperty = DerivedProperty.deriveAny(
      // uniq is necessary because widthPattern and noWidthPattern have some of the same dependent Properties.
      _.uniq( [
        model.curveManipulationProperties.modeProperty,
        model.curveManipulationProperties.widthProperty,
        ...CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.widthPattern.getDependentProperties(),
        ...CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.noWidthPattern.getDependentProperties()
      ] ),
      () => {
        const mode = model.curveManipulationProperties.modeProperty.value;
        const width = model.curveManipulationProperties.widthProperty.value;
        if ( mode.hasAdjustableWidth ) {
          return CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.widthPattern.format( {
            shape: mode.accessibleNameProperty.value,
            width: toFixedNumber( width, CalculusGrapherConstants.WIDTH_DESCRIPTION_DECIMALS )
          } );
        }
        else {
          return CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.noWidthPattern.format( {
            shape: mode.accessibleNameProperty.value
          } );
        }
      } );

    const listItems: AccessibleListItem[] = [

      // f of x
      {
        stringProperty: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.primary.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        visibleProperty: new DerivedProperty(
          [ originalCurveLayerVisibleProperty, model.predictEnabledProperty, showOriginalCurveProperty ],
          ( curveLayerVisible, predictEnabled, showOriginalCurve ) => curveLayerVisible && ( !predictEnabled || showOriginalCurve ) )
      },

      // Predict f of x
      {
        stringProperty: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.predict.createProperty( {
          variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
        } ),
        visibleProperty: DerivedProperty.and( [ originalCurveLayerVisibleProperty, model.predictEnabledProperty ] )
      },

      // Derivative
      {
        stringProperty: CalculusGrapherFluent.a11y.derivativeScreen.screenSummary.currentDetails.derivativeStringProperty,
        visibleProperty: derivativeCurveLayerVisibleProperty
      }
    ];

    super( listItems, {
      leadingParagraphStringProperty: leadingParagraphStringProperty
    } );
  }
}

calculusGrapher.register( 'DerivativeScreenSummaryContent', DerivativeScreenSummaryContent );