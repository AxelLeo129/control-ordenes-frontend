import {
  NgModule
} from '@angular/core';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatTableModule
} from '@angular/material/table';
import {
  MatIconModule
} from '@angular/material/icon';

const MaterialComponents = [MatButtonModule, MatTableModule, MatIconModule]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}