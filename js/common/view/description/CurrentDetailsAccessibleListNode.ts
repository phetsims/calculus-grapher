// Copyright 2026, University of Colorado Boulder

/**
 * CurrentDetailsAccessibleListNode is the 'current details' part of the screen summary, shared by all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../../axon/js/DerivedProperty.js';
import DerivedStringProperty from '../../../../../axon/js/DerivedStringProperty.js';
import { TReadOnlyProperty } from '../../../../../axon/js/TReadOnlyProperty.js';
import { toFixedNumber } from '../../../../../dot/js/util/toFixedNumber.js';
import AccessibleListNode, { AccessibleListItem } from '../../../../../scenery-phet/js/accessibility/AccessibleListNode.js';
import calculusGrapher from '../../../calculusGrapher.js';
import CalculusGrapherFluent from '../../../CalculusGrapherFluent.js';
import CalculusGrapherConstants from '../../CalculusGrapherConstants.js';
import CalculusGrapherSymbols from '../../CalculusGrapherSymbols.js';
import CalculusGrapherModel from '../../model/CalculusGrapherModel.js';
import GraphsNode from '../GraphsNode.js';

export default class CurrentDetailsAccessibleListNode extends AccessibleListNode {

  // I hate the coupling here that results from passing in the entire model and graphNode. But these descriptions
  // have changed so many times, and need access to so many things buried in the model and view, that it's not worth the
  // cost to reduce the coupling here. So if you find yourself adding new code that reaches into model or graphsNode,
  // think twice about whether it's appropriate or necessary.
  public constructor( model: CalculusGrapherModel, graphsNode: GraphsNode ) {

    // visible Properties for each curve that is relevant for this description.
    const visibleProperties: TReadOnlyProperty<boolean>[] = [];

    // Ordered bullet list items for the accessible list.
    const listItems: AccessibleListItem[] = [];

    // Integral Curve. Only screens with an integral include this description.
    if ( graphsNode.integralGraphNode ) {
      const integralCurveVisibleProperty = graphsNode.integralGraphNode.integralCurveVisibleProperty;
      visibleProperties.push( integralCurveVisibleProperty );
      listItems.push( {
        stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.integralStringProperty,
        visibleProperty: integralCurveVisibleProperty
      } );
    }

    // Original Curve. All screens include this description.
    const originalCurveVisibleProperty = graphsNode.originalGraphNode.originalCurveVisibleProperty;
    visibleProperties.push( originalCurveVisibleProperty );
    listItems.push( {
      stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.primary.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      visibleProperty: originalCurveVisibleProperty
    } );

    // Predict Curve. All screens include this description.
    // visible Property
    const predictCurveVisibleProperty = graphsNode.originalGraphNode.predictCurveVisibleProperty;
    visibleProperties.push( predictCurveVisibleProperty );
    listItems.push( {
      stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.predict.createProperty( {
        variable: CalculusGrapherSymbols.accessibleVariableSymbolProperty
      } ),
      visibleProperty: predictCurveVisibleProperty
    } );

    // Derivative Curve. Only screens that with a derivative include this description.
    if ( graphsNode.derivativeGraphNode ) {
      const derivativeCurveVisibleProperty = graphsNode.derivativeGraphNode.derivativeCurveVisibleProperty;
      visibleProperties.push( derivativeCurveVisibleProperty );
      listItems.push( {
        stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.derivativeStringProperty,
        visibleProperty: derivativeCurveVisibleProperty
      } );
    }

    // Second Derivative Curve. Only screens with a second derivative include this description.
    if ( graphsNode.secondDerivativeGraphNode ) {
      const secondDerivativeCurveVisibleProperty = graphsNode.secondDerivativeGraphNode.secondDerivativeCurveVisibleProperty;
      visibleProperties.push( secondDerivativeCurveVisibleProperty );
      listItems.push( {
        stringProperty: CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.secondDerivativeStringProperty,
        visibleProperty: secondDerivativeCurveVisibleProperty
      } );
    }

    // True if at least one curve is visible.
    const someCurveVisibleProperty = DerivedProperty.or( visibleProperties );

    // Value for the {$curveSentence} parameter in the leading paragraph.
    const curvesSentenceStringProperty = new DerivedStringProperty( [
        someCurveVisibleProperty,
        CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.curveSentence.curvesShownStringProperty,
        CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.curveSentence.allCurvesHiddenStringProperty
      ],
      ( someCurveVisible, curvesShownString, allCurvesHiddenString ) => someCurveVisible ? curvesShownString : allCurvesHiddenString
    );

    // _.uniq is necessary because the FluentPatterns share dependent Properties.
    const leadingParagraphDependencies = _.uniq( [

      // Possible pattern to be filled in.
      // FluentPattern instances are not observable. I was advised to observe their dependent Properties.
      // But I'm skeptical that this works correctly for dynamic locale. And there is currently no way to test.
      ...CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.widthPattern.getDependentProperties(),
      ...CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.noWidthPattern.getDependentProperties(),

      // Values to fill in the above patterns.
      model.curveManipulationProperties.modeProperty,
      model.curveManipulationProperties.widthProperty,
      curvesSentenceStringProperty
    ] );

    const leadingParagraphStringProperty = DerivedStringProperty.deriveAny( leadingParagraphDependencies,
      () => {

        const mode = model.curveManipulationProperties.modeProperty.value;

        if ( mode.hasAdjustableWidth ) {
          return CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.widthPattern.format( {
            shape: mode.accessibleNameProperty.value,
            width: toFixedNumber( model.curveManipulationProperties.widthProperty.value, CalculusGrapherConstants.WIDTH_DESCRIPTION_DECIMALS ),
            curveSentence: curvesSentenceStringProperty.value
          } );
        }
        else {
          return CalculusGrapherFluent.a11y.allScreens.screenSummary.currentDetails.noWidthPattern.format( {
            shape: mode.accessibleNameProperty.value,
            curveSentence: curvesSentenceStringProperty.value
          } );
        }
      } );

    super( listItems, {
      leadingParagraphStringProperty: leadingParagraphStringProperty
    } );
  }
}

calculusGrapher.register( 'CurrentDetailsAccessibleListNode', CurrentDetailsAccessibleListNode );