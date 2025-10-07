import { ChangeDetectionStrategy, Component, effect, EventEmitter, input, linkedSignal, output, Output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {

  // @Output() search = new EventEmitter<string>();

  // onSearch(capital: string) {
  //   this.search.emit(capital);
  // }
  value = output<string>();
  placeholder = input<string>('buscar');
  initialValue = input<string>('a'); // valor inicial del input

  inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // Creamos una señal enlazada para el valor del input una vez que se inicializa el componente, se asigna el valor inicial del input a la señal inputValue


  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue(); // Obtenemos el valor del input


    const timeout = setTimeout(() => { // generamos un timeout para evitar que se emita el valor inmediatamente
      this.value.emit(value);  // Emitimos el valor del input
    }, 1000);

    onCleanup(() => { // Limpiamos el timeout cuando el efecto se destruye
      clearTimeout(timeout);
    });

    //   this.value.emit(value); // Emitimos el valor del input
  });
}
