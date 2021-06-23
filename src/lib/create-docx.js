import { Document, HeadingLevel, AlignmentType, TextRun, Paragraph } from 'docx';



const createDocumentFile = (title = "newDocument", description = "", documentText = "") => {
        let options = {};
        
        const sections = options["sections"];
        const children = sections["children"];

        children.push(
            new Paragraph({
                heading: HeadingLevel.TITLE,
                text: title,
                size: 50,
                alignment: AlignmentType.CENTER,
                break: 2,
                font: "Poppins",
                bold: true
            }),
            new Paragraph({
                heading: HeadingLevel.TITLE,
                text: description,
                size: 22,
                break: 2,
                spacing: { after: 200 },
                font: "Poppins"
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: documentText,
                        size: 22,
                        bold: false,
                        font: "Poppins"
                    })
                ]
             })
        );


        return new Document(options);
    };

    export { createDocumentFile };
    export default createDocumentFile;