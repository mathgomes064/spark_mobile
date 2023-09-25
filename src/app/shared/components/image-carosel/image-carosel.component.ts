import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carosel',
  templateUrl: './image-carosel.component.html',
  styleUrls: ['./image-carosel.component.scss'],
})
export class ImageCaroselComponent  implements OnInit {

  public visible: boolean = false;
  public detailImg: any;

  showDialog(currentImage: any) {
      this.visible = true;
      this.detailImg = currentImage;
  }

  @Input() currentAnexos: any
  @Input() currentAnexosToSave: any
 
  constructor() { }

  ngOnInit() {}

}
