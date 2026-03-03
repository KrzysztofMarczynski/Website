import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"; // motyw VS Code

export default function Code() {
  const [activeTab, setActiveTab] = useState("C");

  const codeSamples = {
    C: `#include "./ft_printf.h"
#include "./libft/libft.h"

static int	ft_print_sign(int input, va_list args)
{
	int	i;

	i = 0;
	if (input == 'c')
		i = print_char(va_arg(args, int));
	else if (input == 's')
		i = print_string(va_arg(args, char *));
	else if (input == 'p')
		i = print_pointer(va_arg(args, unsigned long long *));
	else if (input == 'd')
		i = print_number(va_arg(args, int));
	else if (input == 'i')
		i = print_number(va_arg(args, int));
	else if (input == 'u')
		i = print_unsigned(va_arg(args, unsigned int));
	else if (input == 'x' || input == 'X')
		i = print_hex(va_arg(args, unsigned int), input);
	return (i);
}

int	ft_printf(const char *input, ...)
{
	va_list			arguments;
	unsigned int	res;

	res = 0;
	va_start(arguments, input);
	while (*input)
	{
		if (*input == '%')
		{
			input++;
			if (ft_strchr("cspdiuxX", *input))
				res += ft_print_sign(*input, arguments);
			else if (*input == '%')
				res += write(1, "%", 1);
		}
		else
			res += write(1, input, 1);
		input++;
	}
	va_end(arguments);
	return (res);
}`,
    "C++": `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    CSharp: `using System.Collections.Generic;
using JetBrains.Annotations;
using UnityEngine;


public class LevelGenerator : MonoBehaviour
{

	public GameObject layoutRoom;
	int distanceToEnd;
	public static int roomCout;

	public Transform generatorPoint;
	public enum Direction { up, right, down, left };
	public enum Room { layoutRoom }
	public Room selectedRoom;
	public Direction selectedDirection;

	[SerializeField] private float xOffset;
	[SerializeField] private float yOffset;

	public LayerMask whatIsRoom;

	private GameObject endRoom;

	private List<GameObject> layoutRoomObjects = new List<GameObject>();

	public RoomPrefabs rooms;
	public RoomVariations roomVariations;

	void Start()
	{
		distanceToEnd = roomVariations.Send(distanceToEnd);
		roomCout = distanceToEnd;
		GameObject randomRoom = roomVariations.GetRandomRoom();
		Instantiate(randomRoom, generatorPoint.position, generatorPoint.rotation);

		selectedDirection = (Direction)Random.Range(0, 4);
		MoveGenerationPoint();

		for (int i = 0; i < distanceToEnd; i++)
		{
			GameObject newVariation = roomVariations.GetRandomRoom();
			GameObject newRoom = Instantiate(newVariation, generatorPoint.position, generatorPoint.rotation);

			layoutRoomObjects.Add(newRoom);

			if (i == distanceToEnd)
			{
				layoutRoomObjects.RemoveAt(layoutRoomObjects.Count - 1);

				endRoom = newRoom;
			}

			selectedDirection = (Direction)Random.Range(0, 4);
			MoveGenerationPoint();

			while (Physics2D.OverlapCircle(generatorPoint.position, 5f, whatIsRoom))
			{
				MoveGenerationPoint();
			}
		}

		CraeteRoomOutline(Vector3.zero);
		foreach (GameObject room in layoutRoomObjects)
		{
			CraeteRoomOutline(room.transform.position);
		}
	}

	void Update()
	{

	}

	public void MoveGenerationPoint()
	{
		switch (selectedDirection)
		{
			case Direction.up:
				generatorPoint.position += new Vector3(0f, yOffset, 0f);
				break;
			case Direction.left:
				generatorPoint.position += new Vector3(-xOffset, 0f, 0f);
				break;
			case Direction.down:
				generatorPoint.position += new Vector3(0f, -yOffset, 0f);
				break;
			case Direction.right:
				generatorPoint.position += new Vector3(xOffset, 0f, 0f);
				break;
		}
	}

	public void CraeteRoomOutline(Vector3 roomPosition)
	{
		bool roomAbove = Physics2D.OverlapCircle(roomPosition + new Vector3(0f, yOffset, 0f), .2f, whatIsRoom);
		bool roomBelow = Physics2D.OverlapCircle(roomPosition + new Vector3(0f, -yOffset, 0f), .2f, whatIsRoom);
		bool roomLeft = Physics2D.OverlapCircle(roomPosition + new Vector3(-xOffset, 0f, 0f), .2f, whatIsRoom);
		bool roomRight = Physics2D.OverlapCircle(roomPosition + new Vector3(xOffset, 0f, 0f), .2f, whatIsRoom);

		int directionCout = 0;
		if (roomAbove)
		{
			directionCout++;
		}
		if (roomBelow)
		{
			directionCout++;
		}
		if (roomLeft)
		{
			directionCout++;
		}
		if (roomRight)
		{
			directionCout++;
		}

		switch (directionCout)
		{
			case 0:
				Debug.LogError("Found no room");
				break;
			case 1:
				if (roomAbove)
					Instantiate(rooms.singleUp, roomPosition, transform.rotation);
				if (roomBelow)
					Instantiate(rooms.singleDown, roomPosition, transform.rotation);
				if (roomLeft)
					Instantiate(rooms.singleLeft, roomPosition, transform.rotation);
				if (roomRight)
					Instantiate(rooms.singleRight, roomPosition, transform.rotation);
				break;
			case 2:
				if (roomAbove & roomBelow)
					Instantiate(rooms.doubleUpDown, roomPosition, transform.rotation);
				if (roomLeft & roomRight)
					Instantiate(rooms.doubleLeftRight, roomPosition, transform.rotation);
				if (roomAbove & roomRight)
					Instantiate(rooms.doubleUpRight, roomPosition, transform.rotation);
				if (roomRight & roomBelow)
					Instantiate(rooms.doubleRightDown, roomPosition, transform.rotation);
				if (roomBelow & roomLeft)
					Instantiate(rooms.doubleDownLeft, roomPosition, transform.rotation);
				if (roomAbove & roomLeft)
					Instantiate(rooms.doubleUpLeft, roomPosition, transform.rotation);
				break;
			case 3:
				if (roomAbove & roomRight & roomBelow)
					Instantiate(rooms.tripleLeft, roomPosition, transform.rotation);
				if (roomRight & roomBelow & roomLeft)
					Instantiate(rooms.tripleUp, roomPosition, transform.rotation);
				if (roomAbove & roomBelow & roomLeft)
					Instantiate(rooms.tripleRight, roomPosition, transform.rotation);
				if (roomAbove & roomRight & roomLeft)
					Instantiate(rooms.tripleDown, roomPosition, transform.rotation);
				break;
			case 4:
				if (roomAbove & roomRight & roomBelow & roomLeft)
					Instantiate(rooms.fourth, roomPosition, transform.rotation);
				break;
		}
	}
}

[System.Serializable]
public class RoomPrefabs
{
	public GameObject singleUp, singleLeft, singleDown, singleRight,
		doubleUpDown, doubleLeftRight, doubleUpRight, doubleRightDown,
		doubleDownLeft, doubleUpLeft, tripleLeft, tripleUp, tripleRight,
		tripleDown, fourth;
}

[System.Serializable]
public class RoomVariant
{
	public string RoomVariantName;
	public int count = 0;
	public List<GameObject> roomPrefab = new List<GameObject>();

	public GameObject GetRandomPrefab()
	{
		int roll = Random.Range(0, roomPrefab.Count);
		return roomPrefab[roll];
	}
}

[System.Serializable]
public class RoomVariations
{
	public List<RoomVariant> roomVariants = new List<RoomVariant>();

	private LevelGenerator levelGenerator;
	private RandomRoom randRoom;

	bool firstRoom = false;
	int variationsAvailable = 0;

	public int Send(int x)
	{
		foreach (var rv in roomVariants)
		{
			variationsAvailable += rv.count;
		}
		return variationsAvailable;
	}

	public GameObject GetRandomRoom()
	{
		while (variationsAvailable > 0)
		{
			int roll = Random.Range(0, roomVariants.Count);
			if (firstRoom == false)
			{
				firstRoom = true;
				return roomVariants[0].GetRandomPrefab();
			}

			if (roomVariants[roll].count > 0 && variationsAvailable != 0)
			{
				foreach (var rv in roomVariants)
				{
					roomVariants[roll].count--;
					return roomVariants[roll].GetRandomPrefab();
				}
			}
		}
		return null;
	}
}`,
    Python: `print("Hello, World!")`,
  };

  const languageDescriptions = {
    C: (
      <>
        This is my implementation of the printf function in C.
        <br></br>
        I started learning C when I got into 42Warsaw school. There, I was
        forced to write code in a very simple form, which taught me the basics
        of how C works.
        <br />
      </>
    ),
    "C++": (
      <>
        C++ to mój główny język do tworzenia gier i aplikacji wymagających
        wysokiej wydajności.
        <br />
        Pracuję z nowoczesnym standardem (C++17/20/23), szablonami, RAII, smart
        pointerami, STL i wielowątkowością.
      </>
    ),
    CSharp: (
      <>
        It's my own level generation system, just like in The Binding of isaac.
        <br></br>I mainly use C# to create games in Unity.
      </>
    ),
    Python: (
      <>
        Python wybieram, gdy potrzebuję szybko prototypować, automatyzować
        zadania, analizować dane lub eksperymentować z AI/ML.
        <br />
        Używam go do narzędzi CLI, web scrapingu, przetwarzania obrazów i
        skryptów DevOps.
      </>
    ),
  };

  const tabs = Object.keys(codeSamples);

  return (
    <section
      id="Code"
      className="relative min-h-screen pt-12 sm:pt-14 md:pt-16 lg:pt-16 pb-20 px-5 md:px-10 lg:px-16 
                 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 
                 text-white overflow-visible"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold 
            mt-6 sm:mt-6 md:mt-6 lg:mt-6 xl:mt-6
            mb-12 md:mb-14 lg:mb-16
            pb-4 md:pb-6 lg:pb-8
            text-center 
            leading-[1.25] md:leading-[1.2] lg:leading-[1.15]
            tracking-tight
            bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 
            bg-clip-text text-transparent 
            drop-shadow-md
          "
        >
          My Code & Experience
        </motion.h2>

        {/* Zakładki */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10"
        >
          {tabs.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`
                px-6 py-2.5 rounded-full font-medium text-base md:text-lg
                transition-all duration-300 border border-gray-700/60
                ${
                  activeTab === lang
                    ? "bg-gradient-to-r from-blue-600/80 to-indigo-600/80 text-white shadow-lg shadow-blue-700/30 border-blue-500/50"
                    : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/60 hover:text-white hover:border-gray-500/60"
                }
              `}
            >
              {lang}
            </button>
          ))}
        </motion.div>

        {/* Okno kodu – teraz z kolorowaniem składni jak w VS Code */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative w-full max-w-5xl mx-auto bg-gray-950/70 backdrop-blur-md 
                       border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/40 
                       overflow-hidden"
          >
            <div className="max-h-[500px] overflow-y-auto">
              <SyntaxHighlighter
                language={
                  activeTab.toLowerCase() === "c++"
                    ? "cpp"
                    : activeTab.toLowerCase() === "csharp"
                      ? "csharp"
                      : activeTab.toLowerCase()
                }
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "2rem",
                  background: "transparent",
                  fontSize: "1.05rem",
                  lineHeight: "1.6",
                }}
                showLineNumbers
                wrapLongLines
              >
                {codeSamples[activeTab]}
              </SyntaxHighlighter>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-gray-950/40" />
          </motion.div>
        </AnimatePresence>

        {/* Opis doświadczenia */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-10 md:mt-12 lg:mt-14 max-w-3xl mx-auto text-center space-y-8 pb-12 md:pb-16 lg:pb-20"
          >
            <h3 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent leading-[1.25]">
              {activeTab} – My Experience
            </h3>

            <p className="text-lg md:text-xl leading-[1.8] md:leading-[1.9] lg:leading-[2.0] text-gray-300">
              {languageDescriptions[activeTab]}
            </p>

            <a
              href={`https://github.com/KrzysztofMarczynski?tab=repositories&q=&type=&language=${activeTab.toLowerCase()}&sort=`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 
                         bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-500 hover:to-indigo-500 
                         text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-700/30"
            >
              See my {activeTab} repo on GitHub →
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
