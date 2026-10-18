
import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
    providedIn: 'root',
})
export class CvPdfService {
    async generateCv(language: string): Promise<void> {
        const doc = new jsPDF();

        const fontUrl = '/fonts/DejaVuSans.ttf';
        const boldFontUrl = '/fonts/DejaVuSans-Bold.ttf';

        const [regularFont, boldFont] = await Promise.all([
            this.loadFont(fontUrl),
            this.loadFont(boldFontUrl),
        ]);

        this.registerFont(doc, regularFont, 'DejaVuSans', 'normal');
        this.registerFont(doc, boldFont, 'DejaVuSans', 'bold');

        doc.setFont('DejaVuSans', 'bold');
        doc.setFontSize(22);

        const fullName =
            language === 'ka'
                ? 'ალექსი თოდუა'
                : language === 'ru'
                    ? 'Алекс Тодуа'
                    : 'Aleksi Todua';

        doc.text(fullName, 20, 25);


        doc.setFont('DejaVuSans');

        const pageWidth = doc.internal.pageSize.getWidth();

        
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, pageWidth, 68, 'F');

        
        doc.setFont('DejaVuSans', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text(fullName, 20, 25);

        
        doc.setFont('DejaVuSans');
        doc.setFontSize(11);
        doc.setTextColor(212, 175, 55);
        doc.text('Junior Frontend / Angular Developer', 20, 35);

        
        doc.setFontSize(9);
        doc.setTextColor(235, 235, 235);
        doc.text('+995 579 284 717', 20, 47);
        doc.text('alx.todua777@gmail.com', 20, 53);
        doc.text('Tbilisi, Georgia', 20, 59);

        
        doc.setDrawColor(212, 175, 55);
        doc.setLineWidth(0.8);
        doc.line(20, 68, pageWidth - 20, 68);

        doc.setTextColor(40, 40, 40);

        doc.line(20, 68, pageWidth - 20, 68);

        const content = this.getContent(language);

        let y = 80;

        for (const section of content) {
            doc.setFont('DejaVuSans', 'bold');
            doc.setFontSize(13);
            doc.setTextColor(170, 130, 45);
            doc.text(section.title, 20, y);
            y += 8;

            doc.setFont('DejaVuSans');
            doc.setFontSize(10);
            doc.setTextColor(40, 40, 40);

            for (const paragraph of section.lines) {
                const lines = doc.splitTextToSize(paragraph, 170);

                if (y + lines.length * 5 > 280) {
                    doc.addPage();
                    y = 20;
                }

                doc.text(lines, 20, y);
                y += lines.length * 5 + 2;
            }

            y += 4;
        }

        doc.save(`Aleksi_Todua_CV_${language.toUpperCase()}.pdf`);
    }

    private async loadFont(url: string): Promise<string> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Could not load font: ${url}`);
        }

        const buffer = await response.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        let binary = '';

        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }

        return btoa(binary);
    }


    private registerFont(
        doc: jsPDF,
        base64: string,
        fontName: string,
        style: 'normal' | 'bold' = 'normal',
    ): void {
        const fileName = `${fontName}-${style}.ttf`;

        doc.addFileToVFS(fileName, base64);
        doc.addFont(fileName, fontName, style);
    }


    private getContent(language: string): {
        title: string;
        lines: string[];
    }[] {
        const content = {
            en: [
                {
                    title: 'PROFILE',
                    lines: [
                        'Junior Frontend Developer focused on Angular and TypeScript.',
                        'Completed IT Step Academy training and developed an Angular train-booking application.',
                    ],
                },
                {
                    title: 'TECHNICAL SKILLS',
                    lines: [
                        'Angular, TypeScript, JavaScript, HTML, SCSS, REST API, Git',
                        'Python, Django, Django REST Framework, PostgreSQL',
                        'Signals, routing, authentication, internationalization',
                    ],
                },
                {
                    title: 'PROJECT',
                    lines: [
                        'STEP TRAINS — Angular application for searching trains, selecting seats and booking tickets.',
                        'Implemented authentication, multilingual UI, AI-assisted booking and PDF ticket generation.',
                        'Live demo: https://angular-final-project-jzmjuid2u-step-trains.vercel.app',
                    ],
                },
                {
                    title: 'EXPERIENCE',
                    lines: [
                        'Greenway Georgia | Service Center Manager | 2020–Present',
                        'Progressed through several technical and management roles. Manage a team of 8 employees and oversee service-center operations.',
                    ],
                },
                {
                    title: 'EDUCATION',
                    lines: [
                        'IT Step Academy — Front-End and Back-End Development',
                        'Georgian Technical University — Informatics and Systems Management',
                    ],
                },
                {
                    title: 'LANGUAGES',
                    lines: ['Georgian — Native | Russian — Fluent | English — Fluent'],
                },
            ],
            ka: [
                {
                    title: 'პროფილი',
                    lines: [
                        'Junior Frontend დეველოპერი, Angular-ისა და TypeScript-ის მიმართულებით.',
                        'IT Step Academy-ის კურსდამთავრებული. შექმნილი აქვს Angular-ზე დაფუძნებული მატარებლების დაჯავშნის აპლიკაცია.',
                    ],
                },
                {
                    title: 'ტექნიკური უნარები',
                    lines: [
                        'Angular, TypeScript, JavaScript, HTML, SCSS, REST API, Git',
                        'Python, Django, Django REST Framework, PostgreSQL',
                        'Signals, routing, authentication, მრავალენოვანი ინტერფეისი',
                    ],
                },
                {
                    title: 'პროექტი',
                    lines: [
                        'STEP TRAINS — მატარებლების ძიების, ადგილების არჩევისა და ბილეთების დაჯავშნის Angular აპლიკაცია.',
                        'განხორციელებულია ავტორიზაცია, მრავალენოვანი ინტერფეისი, AI დაჯავშნის ასისტენტი და PDF ბილეთები.',
                    ],
                },
                {
                    title: 'გამოცდილება',
                    lines: [
                        'Greenway Georgia | სერვისცენტრის მენეჯერი | 2020–დღემდე',
                        'განვლილი მაქვს ტექნიკური და მენეჯერული პოზიციები. ვმართავ 8 თანამშრომლისგან შემდგარ გუნდს.',
                    ],
                },
                {
                    title: 'განათლება',
                    lines: [
                        'IT Step Academy — Front-End და Back-End პროგრამირება',
                        'საქართველოს ტექნიკური უნივერსიტეტი — ინფორმატიკა და მართვის სისტემები',
                    ],
                },
                {
                    title: 'ენები',
                    lines: ['ქართული — მშობლიური | რუსული — თავისუფლად | ინგლისური — თავისუფლად'],
                },
            ],
            ru: [
                {
                    title: 'ПРОФИЛЬ',
                    lines: [
                        'Начинающий Frontend-разработчик, специализирующийся на Angular и TypeScript.',
                        'Выпускник IT Step Academy. Разработал Angular-приложение для поиска поездов и бронирования билетов.',
                    ],
                },
                {
                    title: 'ТЕХНИЧЕСКИЕ НАВЫКИ',
                    lines: [
                        'Angular, TypeScript, JavaScript, HTML, SCSS, REST API, Git',
                        'Python, Django, Django REST Framework, PostgreSQL',
                        'Signals, маршрутизация, авторизация, мультиязычность',
                    ],
                },
                {
                    title: 'ПРОЕКТ',
                    lines: [
                        'STEP TRAINS — Angular-приложение для поиска поездов, выбора мест и бронирования билетов.',
                        'Реализованы авторизация, мультиязычный интерфейс, AI-помощник бронирования и генерация PDF-билетов.',
                    ],
                },
                {
                    title: 'ОПЫТ РАБОТЫ',
                    lines: [
                        'Greenway Georgia | Руководитель сервисного центра | 2020 — настоящее время',
                        'Прошёл путь от технических до руководящих должностей. Управляю командой из 8 сотрудников.',
                    ],
                },
                {
                    title: 'ОБРАЗОВАНИЕ',
                    lines: [
                        'IT Step Academy — Front-End и Back-End разработка',
                        'Грузинский технический университет — информатика и системы управления',
                    ],
                },
                {
                    title: 'ЯЗЫКИ',
                    lines: ['Грузинский — родной | Русский — свободно | Английский — свободно'],
                },
            ],
        };

        return content[language as keyof typeof content] ?? content.en;
    }
}

