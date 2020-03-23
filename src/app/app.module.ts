import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RoadsComponent} from './components/roads/roads.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SingleRoadComponent} from './components/roads/single-road/single-road.component';
import {RoadNumberComponent} from './components/roads/single-road/road-number/road-number.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminFormComponent} from './components/admin/admin-form/admin-form.component';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {NodesComponent} from './components/nodes/nodes.component';
import {AppConfig} from './config/config';
import {ObstacleComponent} from './components/roads/single-road/obstacle/obstacle.component';
import {NewObstacleDialogComponent} from './components/roads/single-road/obstacle/new-obstacle-dialog/new-obstacle-dialog.component';
import { ObstacleDetailsComponent } from './components/roads/single-road/obstacle/obstacle-details/obstacle-details.component';
import { ObstaclesComponent } from './components/obstacles/obstacles.component';

@NgModule({
  declarations: [
    AppComponent,
    RoadsComponent,
    SingleRoadComponent,
    RoadNumberComponent,
    AdminComponent,
    AdminFormComponent,
    NodesComponent,
    ObstacleComponent,
    NewObstacleDialogComponent,
    ObstacleDetailsComponent,
    ObstaclesComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: AppConfig.GMAP_API_KEY
    }),
    AgmDirectionModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatStepperModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewObstacleDialogComponent, ObstacleDetailsComponent]
})
export class AppModule {
}
