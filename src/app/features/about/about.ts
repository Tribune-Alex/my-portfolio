import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CvPdfService } from '../../services/cv-pdf';

@Component({
  imports: [TranslatePipe],
  selector: 'app-about',
  styleUrl: './about.scss',
  templateUrl: './about.html',
})
export class About {

  selectedCertificate: string | null = null;
  private readonly cvPdfService = inject(CvPdfService);

  openCertificate(imagePath: string): void {
    this.selectedCertificate = imagePath;
  }

  closeCertificate(): void {
    this.selectedCertificate = null;
  }


  get age(): number {
    const today = new Date();
    const birthDate = new Date(1991, 2, 16);

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  downloadCv(): void {
    const language = localStorage.getItem('language') ?? 'en';

    this.cvPdfService.generateCv(language).catch((error: unknown) => {
      console.error('Failed to generate CV PDF:', error);
    });
  }

}
