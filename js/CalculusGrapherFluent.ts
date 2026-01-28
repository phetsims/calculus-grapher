// Copyright 2025-2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from calculus-grapher-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import {TReadOnlyProperty} from '../../axon/js/TReadOnlyProperty.js';
import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentComment from '../../chipper/js/browser/FluentComment.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import calculusGrapher from './calculusGrapher.js';
import CalculusGrapherStrings from './CalculusGrapherStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( CalculusGrapherStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'calculus_grapher_title', 'calculus-grapher.titleStringProperty' );
addToMapIfDefined( 'screen_derivative', 'screen.derivativeStringProperty' );
addToMapIfDefined( 'screen_integral', 'screen.integralStringProperty' );
addToMapIfDefined( 'screen_advanced', 'screen.advancedStringProperty' );
addToMapIfDefined( 'screen_lab', 'screen.labStringProperty' );
addToMapIfDefined( 'smooth', 'smoothStringProperty' );
addToMapIfDefined( 'symbol_d', 'symbol.dStringProperty' );
addToMapIfDefined( 'symbol_f', 'symbol.fStringProperty' );
addToMapIfDefined( 'symbol_x', 'symbol.xStringProperty' );
addToMapIfDefined( 'symbol_t', 'symbol.tStringProperty' );
addToMapIfDefined( 'discontinuities', 'discontinuitiesStringProperty' );
addToMapIfDefined( 'values', 'valuesStringProperty' );
addToMapIfDefined( 'notation', 'notationStringProperty' );
addToMapIfDefined( 'lagrange', 'lagrangeStringProperty' );
addToMapIfDefined( 'leibniz', 'leibnizStringProperty' );
addToMapIfDefined( 'variable', 'variableStringProperty' );
addToMapIfDefined( 'checkbox_areaUnderCurve', 'checkbox.areaUnderCurveStringProperty' );
addToMapIfDefined( 'checkbox_tangent', 'checkbox.tangentStringProperty' );
addToMapIfDefined( 'barometer_netSignedArea', 'barometer.netSignedAreaStringProperty' );
addToMapIfDefined( 'barometer_slopeOfTangent', 'barometer.slopeOfTangentStringProperty' );
addToMapIfDefined( 'predict', 'predictStringProperty' );
addToMapIfDefined( 'show', 'showStringProperty' );
addToMapIfDefined( 'predictPreference', 'predictPreferenceStringProperty' );
addToMapIfDefined( 'valuesPreferenceDescription', 'valuesPreferenceDescriptionStringProperty' );
addToMapIfDefined( 'referenceLine', 'referenceLineStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardHelpHeading', 'curveManipulator.keyboardHelpHeadingStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardHelpLabel', 'curveManipulator.keyboardHelpLabelStringProperty' );
addToMapIfDefined( 'curveManipulator_keyboardCue', 'curveManipulator.keyboardCueStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenButtonsHelpText', 'a11y.derivativeScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_playArea', 'a11y.derivativeScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_controlArea', 'a11y.derivativeScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_currentDetails', 'a11y.derivativeScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_derivativeScreen_screenSummary_interactionHint', 'a11y.derivativeScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenButtonsHelpText', 'a11y.integralScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_playArea', 'a11y.integralScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_controlArea', 'a11y.integralScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_currentDetails', 'a11y.integralScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_integralScreen_screenSummary_interactionHint', 'a11y.integralScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenButtonsHelpText', 'a11y.advancedScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_playArea', 'a11y.advancedScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_controlArea', 'a11y.advancedScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_currentDetails', 'a11y.advancedScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_advancedScreen_screenSummary_interactionHint', 'a11y.advancedScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenButtonsHelpText', 'a11y.labScreen.screenButtonsHelpTextStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_playArea', 'a11y.labScreen.screenSummary.playAreaStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_controlArea', 'a11y.labScreen.screenSummary.controlAreaStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_currentDetails', 'a11y.labScreen.screenSummary.currentDetailsStringProperty' );
addToMapIfDefined( 'a11y_labScreen_screenSummary_interactionHint', 'a11y.labScreen.screenSummary.interactionHintStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleName', 'a11y.gridCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleHelpText', 'a11y.gridCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseChecked', 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_gridCheckbox_accessibleContextResponseUnchecked', 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleName', 'a11y.smoothButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleHelpText', 'a11y.smoothButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleContextResponsePrimaryCurve', 'a11y.smoothButton.accessibleContextResponsePrimaryCurveStringProperty' );
addToMapIfDefined( 'a11y_smoothButton_accessibleContextResponsePredictCurve', 'a11y.smoothButton.accessibleContextResponsePredictCurveStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleName', 'a11y.eraserButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleHelpText', 'a11y.eraserButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleContextResponsePrimaryCurve', 'a11y.eraserButton.accessibleContextResponsePrimaryCurveStringProperty' );
addToMapIfDefined( 'a11y_eraserButton_accessibleContextResponsePredictCurve', 'a11y.eraserButton.accessibleContextResponsePredictCurveStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleName', 'a11y.undoButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleHelpText', 'a11y.undoButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleContextResponsePrimaryCurve', 'a11y.undoButton.accessibleContextResponsePrimaryCurveStringProperty' );
addToMapIfDefined( 'a11y_undoButton_accessibleContextResponsePredictCurve', 'a11y.undoButton.accessibleContextResponsePredictCurveStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleName', 'a11y.eyeToggleButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleHelpText', 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleContextResponseOff', 'a11y.eyeToggleButton.accessibleContextResponseOffStringProperty' );
addToMapIfDefined( 'a11y_eyeToggleButton_accessibleContextResponseOn', 'a11y.eyeToggleButton.accessibleContextResponseOnStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleName', 'a11y.yZoomButtonGroup.zoomInButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomInButton_accessibleContextResponse', 'a11y.yZoomButtonGroup.zoomInButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_yZoomButtonGroup_zoomOutButton_accessibleContextResponse', 'a11y.yZoomButtonGroup.zoomOutButton.accessibleContextResponseStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleHelpText', 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleContextResponseChecked', 'a11y.tangentCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_tangentCheckbox_accessibleContextResponseUnchecked', 'a11y.tangentCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleName', 'a11y.referenceLineCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleHelpText', 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleContextResponseChecked', 'a11y.referenceLineCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineCheckbox_accessibleContextResponseUnchecked', 'a11y.referenceLineCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleName', 'a11y.areaUnderCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleHelpText', 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleContextResponseChecked', 'a11y.areaUnderCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.areaUnderCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_accessibleHelpText', 'a11y.variableRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_xRadioButton_accessibleHelpText', 'a11y.variableRadioButtonGroup.xRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_variableRadioButtonGroup_tRadioButton_accessibleHelpText', 'a11y.variableRadioButtonGroup.tRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_accessibleHelpText', 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictToggleSwitch_accessibleHelpText', 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationWidthSlider_accessibleName', 'a11y.curveManipulationWidthSlider.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationWidthSlider_accessibleHelpText', 'a11y.curveManipulationWidthSlider.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleName', 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleHelpText', 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleName', 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleName', 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleHelpText', 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleHelpTextCollapsed', 'a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleHelpTextCollapsed', 'a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsedStringProperty' );
addToMapIfDefined( 'a11y_netSignedAreaAccordionBox_accessibleParagraph', 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_originalGraph_accessibleHeading', 'a11y.originalGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_originalGraph_accessibleParagraph', 'a11y.originalGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_integralGraph_accessibleHeading', 'a11y.integralGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_integralGraph_accessibleParagraph', 'a11y.integralGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_derivativeGraph_accessibleHeading', 'a11y.derivativeGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_derivativeGraph_accessibleParagraph', 'a11y.derivativeGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_secondDerivativeGraph_accessibleHeading', 'a11y.secondDerivativeGraph.accessibleHeadingStringProperty' );
addToMapIfDefined( 'a11y_secondDerivativeGraph_accessibleParagraph', 'a11y.secondDerivativeGraph.accessibleParagraphStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleName', 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_accessibleHelpText', 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleName', 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleHelpText', 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' );
addToMapIfDefined( 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleName', 'a11y.tangentTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleHelpText', 'a11y.tangentTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_pattern', 'a11y.tangentTool.accessibleObjectResponse.patternStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_xPhrase', 'a11y.tangentTool.accessibleObjectResponse.phrases.xPhraseStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_slopeHidden', 'a11y.tangentTool.accessibleObjectResponse.phrases.slopeHiddenStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_slopeZeroValue', 'a11y.tangentTool.accessibleObjectResponse.phrases.slopeZeroValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_slopePositiveValue', 'a11y.tangentTool.accessibleObjectResponse.phrases.slopePositiveValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_slopeNegativeValue', 'a11y.tangentTool.accessibleObjectResponse.phrases.slopeNegativeValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_derivativeValue', 'a11y.tangentTool.accessibleObjectResponse.phrases.derivativeValueStringProperty' );
addToMapIfDefined( 'a11y_tangentTool_accessibleObjectResponse_phrases_derivativeHidden', 'a11y.tangentTool.accessibleObjectResponse.phrases.derivativeHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleName', 'a11y.referenceLineTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleHelpText', 'a11y.referenceLineTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_patterns_primaryDerivative', 'a11y.referenceLineTool.accessibleObjectResponse.patterns.primaryDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_patterns_integralPrimary', 'a11y.referenceLineTool.accessibleObjectResponse.patterns.integralPrimaryStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_patterns_integralPrimaryDerivative', 'a11y.referenceLineTool.accessibleObjectResponse.patterns.integralPrimaryDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_patterns_primaryDerivativeSecondDerivative', 'a11y.referenceLineTool.accessibleObjectResponse.patterns.primaryDerivativeSecondDerivativeStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_xPhrase', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.xPhraseStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_primaryValue', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.primaryValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_primaryUndefined', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.primaryUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_primaryHidden', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.primaryHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictValue', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictUndefined', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictHidden', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictAndPrimary', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictAndPrimaryStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_integralValue', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.integralValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_integralHidden', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.integralHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_derivativeValue', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_derivativeUndefined', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_derivativeHidden', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeHiddenStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_secondDerivativeValue', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.secondDerivativeValueStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_secondDerivativeUndefined', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.secondDerivativeUndefinedStringProperty' );
addToMapIfDefined( 'a11y_referenceLineTool_accessibleObjectResponse_phrases_secondDerivativeHidden', 'a11y.referenceLineTool.accessibleObjectResponse.phrases.secondDerivativeHiddenStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleName', 'a11y.areaUnderCurveTool.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleHelpText', 'a11y.areaUnderCurveTool.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_areaUnderCurveTool_accessibleObjectResponse', 'a11y.areaUnderCurveTool.accessibleObjectResponseStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_accessibleObjectResponseFocusedReleased', 'a11y.curveManipulator.accessibleObjectResponseFocusedReleasedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_accessibleObjectResponseFocusedGrabbed', 'a11y.curveManipulator.accessibleObjectResponseFocusedGrabbedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_accessibleObjectResponseGrabbed', 'a11y.curveManipulator.accessibleObjectResponseGrabbedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_accessibleObjectResponseReleased', 'a11y.curveManipulator.accessibleObjectResponseReleasedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_accessibleObjectResponseMovedReleased', 'a11y.curveManipulator.accessibleObjectResponseMovedReleasedStringProperty' );
addToMapIfDefined( 'a11y_curveManipulator_accessibleObjectResponseMovedGrabbed', 'a11y.curveManipulator.accessibleObjectResponseMovedGrabbedStringProperty' );
addToMapIfDefined( 'a11y_primaryCurveManipulator_accessibleName', 'a11y.primaryCurveManipulator.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_primaryCurveManipulator_accessibleHelpText', 'a11y.primaryCurveManipulator.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_predictCurveManipulator_accessibleName', 'a11y.predictCurveManipulator.accessibleNameStringProperty' );
addToMapIfDefined( 'a11y_predictCurveManipulator_accessibleHelpText', 'a11y.predictCurveManipulator.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_pushButtonGroup_accessibleHelpText', 'a11y.pushButtonGroup.accessibleHelpTextStringProperty' );
addToMapIfDefined( 'a11y_headings_curveManipulationSettingsAndControls', 'a11y.headings.curveManipulationSettingsAndControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_explorationToolControls', 'a11y.headings.explorationToolControlsStringProperty' );
addToMapIfDefined( 'a11y_headings_explorationTools', 'a11y.headings.explorationToolsStringProperty' );
addToMapIfDefined( 'a11y_headings_curveActions', 'a11y.headings.curveActionsStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const CalculusGrapherFluent = {
  "calculus-grapher": {
    titleStringProperty: _.get( CalculusGrapherStrings, 'calculus-grapher.titleStringProperty' )
  },
  screen: {
    derivativeStringProperty: _.get( CalculusGrapherStrings, 'screen.derivativeStringProperty' ),
    integralStringProperty: _.get( CalculusGrapherStrings, 'screen.integralStringProperty' ),
    advancedStringProperty: _.get( CalculusGrapherStrings, 'screen.advancedStringProperty' ),
    labStringProperty: _.get( CalculusGrapherStrings, 'screen.labStringProperty' )
  },
  smoothStringProperty: _.get( CalculusGrapherStrings, 'smoothStringProperty' ),
  symbol: {
    dStringProperty: _.get( CalculusGrapherStrings, 'symbol.dStringProperty' ),
    fStringProperty: _.get( CalculusGrapherStrings, 'symbol.fStringProperty' ),
    xStringProperty: _.get( CalculusGrapherStrings, 'symbol.xStringProperty' ),
    tStringProperty: _.get( CalculusGrapherStrings, 'symbol.tStringProperty' )
  },
  discontinuitiesStringProperty: _.get( CalculusGrapherStrings, 'discontinuitiesStringProperty' ),
  valuesStringProperty: _.get( CalculusGrapherStrings, 'valuesStringProperty' ),
  notationStringProperty: _.get( CalculusGrapherStrings, 'notationStringProperty' ),
  lagrangeStringProperty: _.get( CalculusGrapherStrings, 'lagrangeStringProperty' ),
  leibnizStringProperty: _.get( CalculusGrapherStrings, 'leibnizStringProperty' ),
  variableStringProperty: _.get( CalculusGrapherStrings, 'variableStringProperty' ),
  checkbox: {
    areaUnderCurveStringProperty: _.get( CalculusGrapherStrings, 'checkbox.areaUnderCurveStringProperty' ),
    tangentStringProperty: _.get( CalculusGrapherStrings, 'checkbox.tangentStringProperty' )
  },
  barometer: {
    netSignedAreaStringProperty: _.get( CalculusGrapherStrings, 'barometer.netSignedAreaStringProperty' ),
    slopeOfTangentStringProperty: _.get( CalculusGrapherStrings, 'barometer.slopeOfTangentStringProperty' )
  },
  predictStringProperty: _.get( CalculusGrapherStrings, 'predictStringProperty' ),
  showStringProperty: _.get( CalculusGrapherStrings, 'showStringProperty' ),
  predictPreferenceStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceStringProperty' ),
  valuesPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'valuesPreferenceDescriptionStringProperty' ),
  predictPreferenceDescriptionStringProperty: _.get( CalculusGrapherStrings, 'predictPreferenceDescriptionStringProperty' ),
  referenceLineStringProperty: _.get( CalculusGrapherStrings, 'referenceLineStringProperty' ),
  curveManipulator: {
    keyboardHelpHeadingStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardHelpHeadingStringProperty' ),
    keyboardHelpLabelStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardHelpLabelStringProperty' ),
    keyboardCueStringProperty: _.get( CalculusGrapherStrings, 'curveManipulator.keyboardCueStringProperty' )
  },
  a11y: {
    derivativeScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.derivativeScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    integralScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.integralScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    advancedScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_advancedScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.advancedScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    labScreen: {
      screenButtonsHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenButtonsHelpText', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenButtonsHelpTextStringProperty' ) ),
      screenSummary: {
        playAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_playArea', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.playAreaStringProperty' ) ),
        controlAreaStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_controlArea', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.controlAreaStringProperty' ) ),
        currentDetailsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_currentDetails', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.currentDetailsStringProperty' ) ),
        interactionHintStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_labScreen_screenSummary_interactionHint', _.get( CalculusGrapherStrings, 'a11y.labScreen.screenSummary.interactionHintStringProperty' ) )
      }
    },
    gridCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_gridCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.gridCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    smoothButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponsePrimaryCurve: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleContextResponsePrimaryCurve', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleContextResponsePrimaryCurveStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponsePredictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_smoothButton_accessibleContextResponsePredictCurve', _.get( CalculusGrapherStrings, 'a11y.smoothButton.accessibleContextResponsePredictCurveStringProperty' ) )
    },
    eraserButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponsePrimaryCurve: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleContextResponsePrimaryCurve', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleContextResponsePrimaryCurveStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponsePredictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eraserButton_accessibleContextResponsePredictCurve', _.get( CalculusGrapherStrings, 'a11y.eraserButton.accessibleContextResponsePredictCurveStringProperty' ) )
    },
    undoButton: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponsePrimaryCurve: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleContextResponsePrimaryCurve', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleContextResponsePrimaryCurveStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponsePredictCurveStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_undoButton_accessibleContextResponsePredictCurve', _.get( CalculusGrapherStrings, 'a11y.undoButton.accessibleContextResponsePredictCurveStringProperty' ) )
    },
    eyeToggleButton: {
      accessibleName: new FluentPattern<{ graph: 'integral' | 'primary' | 'derivative' | 'secondDerivative' | TReadOnlyProperty<'integral' | 'primary' | 'derivative' | 'secondDerivative'> }>( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleNameStringProperty' ), [{"name":"graph","variants":["integral","primary","derivative","secondDerivative"]}] ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseOffStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleContextResponseOff', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleContextResponseOffStringProperty' ) ),
      accessibleContextResponseOnStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_eyeToggleButton_accessibleContextResponseOn', _.get( CalculusGrapherStrings, 'a11y.eyeToggleButton.accessibleContextResponseOnStringProperty' ) )
    },
    yZoomButtonGroup: {
      zoomInButton: {
        accessibleName: new FluentPattern<{ graph: 'integral' | 'derivative' | 'secondDerivative' | TReadOnlyProperty<'integral' | 'derivative' | 'secondDerivative'> }>( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleNameStringProperty' ), [{"name":"graph","variants":["integral","derivative","secondDerivative"]}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponse: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomInButton_accessibleContextResponse', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomInButton.accessibleContextResponseStringProperty' ), [{"name":"max"},{"name":"min"}] )
      },
      zoomOutButton: {
        accessibleName: new FluentPattern<{ graph: 'integral' | 'derivative' | 'secondDerivative' | TReadOnlyProperty<'integral' | 'derivative' | 'secondDerivative'> }>( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleNameStringProperty' ), [{"name":"graph","variants":["integral","derivative","secondDerivative"]}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleHelpTextStringProperty' ) ),
        accessibleContextResponse: new FluentPattern<{ max: FluentVariable, min: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_yZoomButtonGroup_zoomOutButton_accessibleContextResponse', _.get( CalculusGrapherStrings, 'a11y.yZoomButtonGroup.zoomOutButton.accessibleContextResponseStringProperty' ), [{"name":"max"},{"name":"min"}] )
      }
    },
    tangentCheckbox: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.tangentCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    referenceLineCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.referenceLineCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    areaUnderCurveCheckbox: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleHelpTextStringProperty' ) ),
      accessibleContextResponseCheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleContextResponseCheckedStringProperty' ) ),
      accessibleContextResponseUncheckedStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ) )
    },
    variableRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      xRadioButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_xRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.xRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tRadioButton: {
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_variableRadioButtonGroup_tRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.variableRadioButtonGroup.tRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    notationRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      lagrangeRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_lagrangeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.lagrangeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      leibnizRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_notationRadioButtonGroup_leibnizRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.notationRadioButtonGroup.leibnizRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      }
    },
    discontinuitiesRadioButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      noLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_noLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.noLineRadioButton.accessibleHelpTextStringProperty' ) )
      },
      dashedLineRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_discontinuitiesRadioButtonGroup_dashedLineRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.discontinuitiesRadioButtonGroup.dashedLineRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    predictToggleSwitch: {
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictToggleSwitch_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictToggleSwitch.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    curveManipulationWidthSlider: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationWidthSlider_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationWidthSlider.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ max: FluentVariable, min: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulationWidthSlider_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationWidthSlider.accessibleHelpTextStringProperty' ), [{"name":"max"},{"name":"min"},{"name":"variable"}] )
    },
    curveManipulationModeRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      hillRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_hillRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.hillRadioButton.accessibleHelpTextStringProperty' ) )
      },
      triangleRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_triangleRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.triangleRadioButton.accessibleHelpTextStringProperty' ) )
      },
      pedestalRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_pedestalRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.pedestalRadioButton.accessibleHelpTextStringProperty' ) )
      },
      parabolaRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_parabolaRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.parabolaRadioButton.accessibleHelpTextStringProperty' ) )
      },
      sinusoidRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_sinusoidRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.sinusoidRadioButton.accessibleHelpTextStringProperty' ) )
      },
      freeformRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_freeformRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.freeformRadioButton.accessibleHelpTextStringProperty' ) )
      },
      tiltRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_tiltRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.tiltRadioButton.accessibleHelpTextStringProperty' ) )
      },
      shiftRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_curveManipulationModeRadioButtonGroup_shiftRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.curveManipulationModeRadioButtonGroup.shiftRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    graphSetRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      integralPrimaryRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryRadioButton.accessibleHelpTextStringProperty' ) )
      },
      primaryDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      integralPrimaryDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_integralPrimaryDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.integralPrimaryDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      },
      primaryDerivativeSecondDerivativeRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_graphSetRadioButtonGroup_primaryDerivativeSecondDerivativeRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.graphSetRadioButtonGroup.primaryDerivativeSecondDerivativeRadioButton.accessibleHelpTextStringProperty' ) )
      }
    },
    slopeOfTangentAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleHelpTextCollapsed', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"variable"}] ),
      accessibleParagraph: new FluentPattern<{ derivativeValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_slopeOfTangentAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.slopeOfTangentAccordionBox.accessibleParagraphStringProperty' ), [{"name":"derivativeValue"},{"name":"variable"},{"name":"x"}] )
    },
    netSignedAreaAccordionBox: {
      accessibleHelpTextCollapsed: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleHelpTextCollapsed', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleHelpTextCollapsedStringProperty' ), [{"name":"variable"}] ),
      accessibleParagraph: new FluentPattern<{ integralValue: FluentVariable, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_netSignedAreaAccordionBox_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.netSignedAreaAccordionBox.accessibleParagraphStringProperty' ), [{"name":"integralValue"},{"name":"variable"},{"name":"x"}] )
    },
    originalGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_originalGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.originalGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_originalGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.originalGraph.accessibleParagraphStringProperty' ) )
    },
    integralGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.integralGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_integralGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.integralGraph.accessibleParagraphStringProperty' ) )
    },
    derivativeGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.derivativeGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_derivativeGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.derivativeGraph.accessibleParagraphStringProperty' ) )
    },
    secondDerivativeGraph: {
      accessibleHeadingStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_secondDerivativeGraph_accessibleHeading', _.get( CalculusGrapherStrings, 'a11y.secondDerivativeGraph.accessibleHeadingStringProperty' ) ),
      accessibleParagraphStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_secondDerivativeGraph_accessibleParagraph', _.get( CalculusGrapherStrings, 'a11y.secondDerivativeGraph.accessibleParagraphStringProperty' ) )
    },
    predictRadioButtonGroup: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleNameStringProperty' ) ),
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.accessibleHelpTextStringProperty' ) ),
      originalCurveRadioButton: {
        accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleNameStringProperty' ), [{"name":"variable"}] ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_originalCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.originalCurveRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      },
      predictCurveRadioButton: {
        accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleNameStringProperty' ) ),
        accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictRadioButtonGroup_predictCurveRadioButton_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictRadioButtonGroup.predictCurveRadioButton.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
      }
    },
    showOriginalCurveCheckbox: {
      accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleName', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleNameStringProperty' ), [{"name":"variable"}] ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseChecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseChecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseCheckedStringProperty' ), [{"name":"variable"}] ),
      accessibleContextResponseUnchecked: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_showOriginalCurveCheckbox_accessibleContextResponseUnchecked', _.get( CalculusGrapherStrings, 'a11y.showOriginalCurveCheckbox.accessibleContextResponseUncheckedStringProperty' ), [{"name":"variable"}] )
    },
    tangentTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: {
        _comment_0: new FluentComment( {"comment":"Pattern has a phrase placeholder for each graph that the tangent tool intersects.","associatedKey":"pattern"} ),
        pattern: new FluentPattern<{ derivativePhrase: FluentVariable, slopePhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_pattern', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.patternStringProperty' ), [{"name":"derivativePhrase"},{"name":"slopePhrase"},{"name":"xPhrase"}] ),
        _comment_1: new FluentComment( {"comment":"Phrases that are substituted into tangentTool.accessibleObjectResponse.pattern","associatedKey":"phrases"} ),
        _comment_2: new FluentComment( {"comment":"Phrases that are substituted into referenceLineTool.accessibleObjectResponse.patterns","associatedKey":"phrases"} ),
        phrases: {
          xPhrase: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_xPhrase', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.xPhraseStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          slopeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_slopeHidden', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.slopeHiddenStringProperty' ) ),
          slopeZeroValueStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_slopeZeroValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.slopeZeroValueStringProperty' ) ),
          slopePositiveValue: new FluentPattern<{ absoluteValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_slopePositiveValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.slopePositiveValueStringProperty' ), [{"name":"absoluteValue"}] ),
          slopeNegativeValue: new FluentPattern<{ absoluteValue: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_slopeNegativeValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.slopeNegativeValueStringProperty' ), [{"name":"absoluteValue"}] ),
          derivativeValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_derivativeValue', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.derivativeValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          derivativeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_tangentTool_accessibleObjectResponse_phrases_derivativeHidden', _.get( CalculusGrapherStrings, 'a11y.tangentTool.accessibleObjectResponse.phrases.derivativeHiddenStringProperty' ) )
        }
      }
    },
    referenceLineTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: {
        _comment_0: new FluentComment( {"comment":"Patterns that have a phrase placeholder for each graph that the reference line intersects.","associatedKey":"patterns"} ),
        patterns: {
          primaryDerivative: new FluentPattern<{ derivativePhrase: FluentVariable, primaryPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_patterns_primaryDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.patterns.primaryDerivativeStringProperty' ), [{"name":"derivativePhrase"},{"name":"primaryPhrase"},{"name":"xPhrase"}] ),
          integralPrimary: new FluentPattern<{ integralPhrase: FluentVariable, primaryPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_patterns_integralPrimary', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.patterns.integralPrimaryStringProperty' ), [{"name":"integralPhrase"},{"name":"primaryPhrase"},{"name":"xPhrase"}] ),
          integralPrimaryDerivative: new FluentPattern<{ derivativePhrase: FluentVariable, integralPhrase: FluentVariable, primaryPhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_patterns_integralPrimaryDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.patterns.integralPrimaryDerivativeStringProperty' ), [{"name":"derivativePhrase"},{"name":"integralPhrase"},{"name":"primaryPhrase"},{"name":"xPhrase"}] ),
          primaryDerivativeSecondDerivative: new FluentPattern<{ derivativePhrase: FluentVariable, primaryPhrase: FluentVariable, secondDerivativePhrase: FluentVariable, xPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_patterns_primaryDerivativeSecondDerivative', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.patterns.primaryDerivativeSecondDerivativeStringProperty' ), [{"name":"derivativePhrase"},{"name":"primaryPhrase"},{"name":"secondDerivativePhrase"},{"name":"xPhrase"}] )
        },
        _comment_1: new FluentComment( {"comment":"Phrases that are substituted into tangentTool.accessibleObjectResponse.pattern","associatedKey":"phrases"} ),
        _comment_2: new FluentComment( {"comment":"Phrases that are substituted into referenceLineTool.accessibleObjectResponse.patterns","associatedKey":"phrases"} ),
        phrases: {
          xPhrase: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_xPhrase', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.xPhraseStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          primaryValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_primaryValue', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.primaryValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          primaryUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_primaryUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.primaryUndefinedStringProperty' ), [{"name":"variable"}] ),
          primaryHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_primaryHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.primaryHiddenStringProperty' ) ),
          predictValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictValue', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          predictUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictUndefinedStringProperty' ), [{"name":"variable"}] ),
          predictHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictHiddenStringProperty' ) ),
          predictAndPrimary: new FluentPattern<{ predictPhrase: FluentVariable, primaryPhrase: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_predictAndPrimary', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.predictAndPrimaryStringProperty' ), [{"name":"predictPhrase"},{"name":"primaryPhrase"}] ),
          integralValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_integralValue', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.integralValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          integralHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_integralHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.integralHiddenStringProperty' ) ),
          derivativeValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_derivativeValue', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          derivativeUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_derivativeUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeUndefinedStringProperty' ), [{"name":"variable"}] ),
          derivativeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_derivativeHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.derivativeHiddenStringProperty' ) ),
          secondDerivativeValue: new FluentPattern<{ value: FluentVariable, variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_secondDerivativeValue', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.secondDerivativeValueStringProperty' ), [{"name":"value"},{"name":"variable"}] ),
          secondDerivativeUndefined: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_secondDerivativeUndefined', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.secondDerivativeUndefinedStringProperty' ), [{"name":"variable"}] ),
          secondDerivativeHiddenStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_referenceLineTool_accessibleObjectResponse_phrases_secondDerivativeHidden', _.get( CalculusGrapherStrings, 'a11y.referenceLineTool.accessibleObjectResponse.phrases.secondDerivativeHiddenStringProperty' ) )
        }
      }
    },
    areaUnderCurveTool: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleName', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleHelpTextStringProperty' ), [{"name":"variable"}] ),
      accessibleObjectResponse: new FluentPattern<{ absoluteIntegralValue: FluentVariable, integralValue: FluentVariable, sign: number | 'zero' | 'positive' | 'negative' | TReadOnlyProperty<number | 'zero' | 'positive' | 'negative'>, variable: FluentVariable, x: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_areaUnderCurveTool_accessibleObjectResponse', _.get( CalculusGrapherStrings, 'a11y.areaUnderCurveTool.accessibleObjectResponseStringProperty' ), [{"name":"absoluteIntegralValue"},{"name":"integralValue"},{"name":"sign","variants":[{"type":"number","value":"zero"},"positive","negative"]},{"name":"variable"},{"name":"x"}] )
    },
    curveManipulator: {
      accessibleObjectResponseFocusedReleased: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_accessibleObjectResponseFocusedReleased', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.accessibleObjectResponseFocusedReleasedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseFocusedGrabbed: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_accessibleObjectResponseFocusedGrabbed', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.accessibleObjectResponseFocusedGrabbedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseGrabbed: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_accessibleObjectResponseGrabbed', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.accessibleObjectResponseGrabbedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseReleased: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_accessibleObjectResponseReleased', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.accessibleObjectResponseReleasedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseMovedReleased: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_accessibleObjectResponseMovedReleased', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.accessibleObjectResponseMovedReleasedStringProperty' ), [{"name":"x"},{"name":"y"}] ),
      accessibleObjectResponseMovedGrabbed: new FluentPattern<{ x: FluentVariable, y: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_curveManipulator_accessibleObjectResponseMovedGrabbed', _.get( CalculusGrapherStrings, 'a11y.curveManipulator.accessibleObjectResponseMovedGrabbedStringProperty' ), [{"name":"x"},{"name":"y"}] )
    },
    primaryCurveManipulator: {
      accessibleName: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_primaryCurveManipulator_accessibleName', _.get( CalculusGrapherStrings, 'a11y.primaryCurveManipulator.accessibleNameStringProperty' ), [{"name":"variable"}] ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_primaryCurveManipulator_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.primaryCurveManipulator.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    predictCurveManipulator: {
      accessibleNameStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_predictCurveManipulator_accessibleName', _.get( CalculusGrapherStrings, 'a11y.predictCurveManipulator.accessibleNameStringProperty' ) ),
      accessibleHelpText: new FluentPattern<{ variable: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_predictCurveManipulator_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.predictCurveManipulator.accessibleHelpTextStringProperty' ), [{"name":"variable"}] )
    },
    pushButtonGroup: {
      accessibleHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_pushButtonGroup_accessibleHelpText', _.get( CalculusGrapherStrings, 'a11y.pushButtonGroup.accessibleHelpTextStringProperty' ) )
    },
    headings: {
      curveManipulationSettingsAndControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_curveManipulationSettingsAndControls', _.get( CalculusGrapherStrings, 'a11y.headings.curveManipulationSettingsAndControlsStringProperty' ) ),
      explorationToolControlsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_explorationToolControls', _.get( CalculusGrapherStrings, 'a11y.headings.explorationToolControlsStringProperty' ) ),
      explorationToolsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_explorationTools', _.get( CalculusGrapherStrings, 'a11y.headings.explorationToolsStringProperty' ) ),
      curveActionsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_headings_curveActions', _.get( CalculusGrapherStrings, 'a11y.headings.curveActionsStringProperty' ) )
    }
  }
};

export default CalculusGrapherFluent;

calculusGrapher.register('CalculusGrapherFluent', CalculusGrapherFluent);
