import java.io.*;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import javax.xml.parsers.*;
import javax.xml.stream.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.*;
import org.xml.sax.helpers.DefaultHandler;

// Selección de trazas independientes de JAXB. Usa NIO solo para aislar y limpiar
// los archivos temporales de las pruebas, no como contenido de los cuestionarios.
class VerificarTrazas {
    static int checks;
    static void check(Object actual, Object expected) {
        if (!Objects.equals(actual, expected)) {
            throw new AssertionError("Esperado: " + expected + "; obtenido: " + actual);
        }
        checks++;
    }
    static Document xml(String text) throws Exception {
        return DocumentBuilderFactory.newInstance().newDocumentBuilder()
            .parse(new ByteArrayInputStream(text.getBytes("UTF-8")));
    }
    public static void main(String[] args) throws Exception {
        var temp = Files.createTempDirectory("cuestionarios-trazas-");
        try {
            File f = temp.resolve("nuevo.txt").toFile();
            check(f.exists(), false); // ac-01
            check(f.createNewFile(), true);
            try (var out = new FileOutputStream(f)) { out.write(9); }
            check(f.createNewFile(), false); // ac-02
            check(f.length(), 1L);
            check(new File("informes", "enero.txt").getName(), "enero.txt");
            check(f.list(), null); // ac-05
            File folder = temp.resolve("c.txt").toFile();
            check(folder.mkdir(), true);
            check(Arrays.asList(temp.toFile().list((d, n) -> n.endsWith(".txt")))
                .contains("c.txt"), true); // ac-04
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            out.write(new byte[]{10,20,30,40,50}, 1, 3);
            check(Arrays.toString(out.toByteArray()), "[20, 30, 40]"); // ac-06
            out.reset();
            out.write(new byte[]{8,9,3,4});
            check(Arrays.toString(out.toByteArray()), "[8, 9, 3, 4]"); // md-03
            var input = new ByteArrayInputStream(new byte[]{0,7});
            int n = 0;
            while (input.read() != -1) n++;
            check(n, 2); // ac-08
            try (var stream = new FileOutputStream(f)) { stream.write(new byte[]{1,2,3}); }
            try (var stream = new FileOutputStream(f)) { stream.write(9); }
            check(Arrays.toString(Files.readAllBytes(f.toPath())), "[9]"); // ac-09
            try (var stream = new FileOutputStream(f, true)) { stream.write(6); }
            check(Arrays.toString(Files.readAllBytes(f.toPath())), "[9, 6]"); // ac-10
            var objectBytes = new ByteArrayOutputStream();
            try (var stream = new ObjectOutputStream(objectBytes)) { stream.writeObject("Eva"); }
            try (var stream = new ObjectInputStream(new ByteArrayInputStream(objectBytes.toByteArray()))) {
                check((String) stream.readObject(), "Eva"); // ac-11
            }
            var reader = new BufferedReader(new StringReader("uno\n\ntres"));
            n = 0;
            while (reader.readLine() != null) n++;
            check(n, 3); // ac-13
            reader = new BufferedReader(new StringReader("A\n\nB\nC"));
            n = 0;
            String line;
            while ((line = reader.readLine()) != null && !line.isEmpty()) n++;
            check(n, 1); // md-07
            File binary = temp.resolve("r.bin").toFile();
            try (var raf = new RandomAccessFile(binary, "rw")) {
                raf.setLength(24);
                raf.seek(12);
                raf.writeInt(99);
                check(raf.getFilePointer(), 16L); // md-09
                check(raf.length(), 24L);
                raf.seek(0);
                raf.readInt(); raf.readDouble();
                check(raf.getFilePointer(), 12L); // ac-18
                raf.seek(16); raf.readInt();
                check(raf.getFilePointer(), 20L); // mn-13
                raf.setLength(20);
                raf.seek(0); raf.writeInt(7);
                check(raf.length(), 20L); // ac-19
                raf.setLength(56);
                raf.seek(8 + 3 * 12 + 4); raf.writeDouble(6.75);
                raf.seek(48); check(raf.readDouble(), 6.75); // md-01
            }
            File renamed = temp.resolve("renombrado.txt").toFile();
            check(f.renameTo(renamed), true);
            check(f.getName(), "nuevo.txt"); // ac-20
            check(f.exists() + " " + renamed.exists(), "false true"); // md-05
            byte[] b = {0,0,0,0,0};
            input = new ByteArrayInputStream(new byte[]{11,22,33,44,55});
            check(input.read(b,2,2), 2);
            check(Arrays.toString(b), "[0, 0, 11, 22, 0]"); // md-11
            input = new ByteArrayInputStream(new byte[]{0,1,0,2});
            n = 0;
            while (input.read() > 0) n++;
            check(n, 0); // md-19

            Document doc = xml("<grupo><alumno/><subgrupo><alumno/></subgrupo></grupo>");
            check(doc.getDocumentElement().getElementsByTagName("alumno").getLength(), 2); // bc-05
            check(doc.getElementsByTagName("alumno").item(2), null); // bc-07
            Element element = xml("<nombre>Eva</nombre>").getDocumentElement();
            check(element.getNodeValue(), null); // bc-03
            check(element.getTextContent(), "Eva");
            check(xml("<alumno id='A7'>Eva</alumno>").getDocumentElement().getAttribute("id"), "A7");
            check(xml("<grupo>\n  <alumno/>\n</grupo>").getDocumentElement()
                .getFirstChild().getNodeType(), Node.TEXT_NODE); // bc-06
            check(xml("<p>Hola <b>Eva</b>!</p>").getDocumentElement().getTextContent(), "Hola Eva!");
            check(xml("<cliente><nombre>Eva</nombre><empresa><nombre>Tienda</nombre></empresa></cliente>")
                .getDocumentElement().getTextContent(), "EvaTienda"); // md-02
            doc = xml("<r><item/><item/><item/></r>");
            NodeList list = doc.getDocumentElement().getElementsByTagName("item");
            for (int i=0; i<list.getLength(); i++) doc.getDocumentElement().removeChild(list.item(i));
            check(list.getLength(), 1); // md-06
            doc = xml("<r><a/><b/></r>");
            Element a = (Element) doc.getElementsByTagName("a").item(0);
            Element parentB = (Element) doc.getElementsByTagName("b").item(0);
            Element child = doc.createElement("dato");
            a.appendChild(child); parentB.appendChild(child);
            check(a.getChildNodes().getLength(), 0); // md-16
            check(child.getParentNode(), parentB);
            StringWriter result = new StringWriter();
            TransformerFactory.newInstance().newTransformer()
                .transform(new DOMSource(doc), new StreamResult(result));
            check(result.toString().contains("<dato"), true); // bc-08/09
            var saxText = new StringBuilder();
            var handler = new DefaultHandler() {
                public void characters(char[] ch, int start, int length) {
                    saxText.append(ch, start, length);
                }
            };
            handler.characters(new char[]{'X','E','v','a','Y'},1,3);
            check(saxText.toString(), "Eva"); // bc-12
            saxText.setLength(0);
            handler.characters("12".toCharArray(),0,2);
            handler.characters("5".toCharArray(),0,1);
            check(saxText.toString(), "125"); // bc-13
            XMLStreamReader r = XMLInputFactory.newInstance().createXMLStreamReader(
                new StringReader("<r><precio>12</precio><stock>3</stock></r>"));
            int closes = 0;
            while (r.hasNext()) {
                int type = r.next();
                if (type == XMLStreamConstants.START_ELEMENT && r.getLocalName().equals("precio")) {
                    check(r.getElementText(), "12");
                    check(r.getEventType(), XMLStreamConstants.END_ELEMENT); // bc-16
                } else if (type == XMLStreamConstants.END_ELEMENT) closes++;
            }
            check(closes, 2); // md-04
            r.close();
            System.out.println(checks + " comprobaciones Java correctas (selección de trazas; JAXB no ejecutado).");
        } finally {
            // Solo se eliminan los archivos creados por esta ejecución, en su carpeta temporal propia.
            try (var paths = Files.walk(temp)) {
                for (var path : paths.sorted(Comparator.reverseOrder()).toList()) Files.delete(path);
            }
        }
    }
}
