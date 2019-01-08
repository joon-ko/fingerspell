writefile = open("words2.txt", "w")

with open("words.txt") as f:
	words = f.read().splitlines()

count = 0
writefile.write("[")

for word in words:
	if len(word) > 3 and len(word) < 8:
		writefile.write("\"" + word + "\"" + ",")
		count += 1

writefile.write("zebra]")

print("old count: " + str(len(words)))
print("count:", str(count))

writefile.close()