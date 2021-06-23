
const formatUrl = value => {
    let formattedText = value.toString().trim();
        formattedText = formattedText.replaceAll(",", " ");
        formattedText = formattedText.replaceAll(".", " ");
        formattedText = formattedText.replaceAll("?", " ");
        formattedText = formattedText.replaceAll("!", " ");
        formattedText = formattedText.replaceAll("'", "");
        formattedText = formattedText.replaceAll("[", "");
        formattedText = formattedText.replaceAll("]", "");
        formattedText = formattedText.replaceAll("|", "");
        formattedText = formattedText.replaceAll(`"`, "");
        formattedText = formattedText.replaceAll("$", "");
        formattedText = formattedText.replaceAll("%", "");
        formattedText = formattedText.replaceAll("+", "");
        formattedText = formattedText.replaceAll("{", "");
        formattedText = formattedText.replaceAll("}", "");
        formattedText = formattedText.replaceAll("#", "");
        formattedText = formattedText.replaceAll("@", "");
        formattedText = formattedText.replaceAll("&", "-");
        formattedText = formattedText.replaceAll("  ", " ");
        formattedText = formattedText.trim().split(" ").join("-");

        value = formattedText;
    return value;
};


export { formatUrl };
export default formatUrl;
