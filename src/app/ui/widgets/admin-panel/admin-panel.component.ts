import { Component, Input } from '@angular/core';
/* import { IPanelTypes } from 'src/app/models/admin.model'; */
import { INewsItem } from 'src/app/models/news.model';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})



export class AdminPanelComponent {
  @Input() typeItem: IProduct | INewsItem | object = {}
  @Input() controls: string[] = [];
  /* @Input() typePanel: IPanelTypes = IPanelTypes.ItemCreate; */

}
