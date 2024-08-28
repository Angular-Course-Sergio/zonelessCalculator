import {
  ChangeDetectionStrategy,
  Component,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  handleClick(key: string) {
    console.log({ key });
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      Backspace: 'C',
      Clear: 'C',
      Delete: 'C',
      Enter: '=',
      '*': '⨉',
      '/': '÷',
    };

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    this.calculatorButtons().forEach((btn) => {
      btn.keyboardPressedStyle(keyValue);
    });
  }
}
