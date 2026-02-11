// Copyright 2026, University of Colorado Boulder

/**
 * CurrentDetailsAccessibleListNode is the 'current details' part of the screen summary, shared by all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import AccessibleListNode, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import CalculusGrapherModel from '../../model/CalculusGrapherModel.js';
import CalculusGrapherPreferences from '../../model/CalculusGrapherPreferences.js';
import GraphType from '../../model/GraphType.js';
import GraphsNode from '../GraphsNode.js';

export default class CurrentDetailsAccessibleListNode extends AccessibleListNode {

  // I hate the coupling here that results from passing in the entire model and graphNode. But these descriptions
  // have changed so many times, and need access to so many things buried in the model and view, that it's not worth the
  // cost to reduce the coupling here. So if you find yourself adding new code that reaches into model or graphsNode,
  // think twice about whether it's appropriate or necessary.
  public constructor( model: CalculusGrapherModel, graphsNode: GraphsNode ) {

    const leadingParagraphStringProperty = DerivedProperty.deriveAny(
      // uniq is necessary because widthPattern and noWidthPattern have some of the same dependent Properties.
      _.uniq( [
        model.curveManipulationProperties.modeProperty,
        model.curveManipulationProperties.widthProperty,

        // FluentPattern instances are not observable. I was advised to observe their dependent Properties.
        // But I'm skeptical that this works correctly for dynamic locale. And there is currently no way to test.
        ...CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.widthPattern.getDependentProperties(),
        ...CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.noWidthPattern.getDependentProperties()
      ] ),
      () => {
        const mode = model.curveManipulationProperties.modeProperty.value;
        const width = model.curveManipulationProperties.widthProperty.value;
        if ( mode.hasAdjustableWidth ) {
          return CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.widthPattern.format( {
            shape: mode.accessibleNameProperty.value,
            width: toFixedNumber( width, CalculusGrapherConstants.WIDTH_DESCRIPTION_DECIMALS )
          } );
        }
        else {
          return CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.noWidthPattern.format( {
            shape: mode.accessibleNameProperty.value
          } );
        }
      } );

    const listItems: AccessibleListItem[] = [];

    // Integral
    if ( graphsNode.integralGraphNode ) {
      listItems.push( {
        stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.integralStringProperty,
        visibleProperty: new DerivedProperty(
          [ model.graphSetProperty, graphsNode.integralGraphNode.curveLayerVisibleProperty ],
          ( graphSet, curveLayerVisible ) => graphSet.includes( GraphType.INTEGRAL ) && curveLayerVisible )
      } );
    }

    // f of x
    listItems.push( {
      stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.primary.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      visibleProperty: new DerivedProperty( [
          graphsNode.originalGraphNode.curveLayerVisibleProperty,
          graphsNode.originalGraphNode.showOriginalCurveProperty,
          CalculusGrapherPreferences.predictFeatureEnabledProperty,
          model.predictSelectedProperty
        ],
        ( originalCurveLayerVisible, showOriginalCurve, predictFeatureEnabled, predictSelected ) =>
          originalCurveLayerVisible && ( showOriginalCurve || !( predictFeatureEnabled && predictSelected ) ) )
    } );

    // Predict f of x
    listItems.push( {
      stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.predict.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      visibleProperty: DerivedProperty.and( [
        graphsNode.originalGraphNode.curveLayerVisibleProperty,
        CalculusGrapherPreferences.predictFeatureEnabledProperty,
        model.predictSelectedProperty
      ] )
    } );

    // Derivative
    if ( graphsNode.derivativeGraphNode ) {
      listItems.push( {
        stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.derivativeStringProperty,
        visibleProperty: new DerivedProperty(
          [ model.graphSetProperty, graphsNode.derivativeGraphNode.curveLayerVisibleProperty ],
          ( graphSet, curveLayerVisible ) => graphSet.includes( GraphType.DERIVATIVE ) && curveLayerVisible )
      } );
    }

    // Second Derivative
    if ( graphsNode.secondDerivativeGraphNode ) {
      listItems.push( {
        stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.secondDerivativeStringProperty,
        visibleProperty: new DerivedProperty(
          [ model.graphSetProperty, graphsNode.secondDerivativeGraphNode.curveLayerVisibleProperty ],
          ( graphSet, curveLayerVisible ) => graphSet.includes( GraphType.SECOND_DERIVATIVE ) && curveLayerVisible )
      } );
    }

    super( listItems, {
      leadingParagraphStringProperty: leadingParagraphStringProperty
    } );
  }
}

calculusGrapher.register( 'CurrentDetailsAccessibleListNode', CurrentDetailsAccessibleListNode );