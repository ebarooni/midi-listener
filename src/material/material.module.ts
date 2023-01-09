import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from "@angular/material/select";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    NoopAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    ClipboardModule
  ],
  exports: [
    NoopAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    ClipboardModule
  ]
})
export class MaterialModule { }
