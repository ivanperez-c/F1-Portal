import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-uploader.html',
  styleUrls: ['./image-uploader.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploaderComponent),
      multi: true
    }
  ]
})
export class ImageUploaderComponent implements ControlValueAccessor {
  
  previewUrl: string | null = null;
  isDisabled = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen es demasiado pesada (Máx 2MB)');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.previewUrl = base64String;
        
        this.onChange(base64String); 
      };
      reader.readAsDataURL(file);
    }
  }

  writeValue(value: string): void {
    this.previewUrl = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}