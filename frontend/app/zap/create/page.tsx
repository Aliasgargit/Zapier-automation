"use client";

import { BACKEND_URL } from "@/app/config";
import { Appbar } from "@/components/Appbar";
import { Input } from "@/components/Input";
import { NodeConnector, ZapCell } from "@/components/ZapCell";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type AvailableItem = {
  id: string;
  name: string;
  image: string;
};

function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState<AvailableItem[]>([]);
  const [availableTriggers, setAvailableTriggers] = useState<AvailableItem[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/trigger/available`)
      .then((x) => setAvailableTriggers(x.data.availableTriggers));

    axios
      .get(`${BACKEND_URL}/api/v1/action/available`)
      .then((x) => setAvailableActions(x.data.availableActions));
  }, []);

  return {
    availableActions,
    availableTriggers,
  };
}

export default function CreateZapPage() {
  const router = useRouter();
  const { availableActions, availableTriggers } =
    useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
    image?: string;
  }>();

  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
      image?: string;
      metadata: any;
    }[]
  >([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null
  );

  return (
    <div className="min-h-screen">
      <Appbar />
      <div className="flex items-center justify-between border-b border-line/70 bg-white/60 px-6 py-4 backdrop-blur">
        <div>
          <div className="font-display text-xl font-bold text-ink">
            Build your Zap
          </div>
          <div className="text-sm text-muted">
            Connect a trigger to one or more actions
          </div>
        </div>
        <PrimaryButton
          onClick={async () => {
            if (!selectedTrigger?.id) {
              return;
            }

            const actions = selectedActions
              .filter((a) => a.availableActionId)
              .map((a) => ({
                availableActionId: a.availableActionId,
                actionMetadata: a.metadata ?? {},
              }));

            if (actions.length === 0) {
              alert("Add at least one action before publishing");
              return;
            }

            await axios.post(
              `${BACKEND_URL}/api/v1/zap`,
              {
                availableTriggerId: selectedTrigger.id,
                triggerMetadata: {},
                actions,
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            );

            router.push("/dashboard");
          }}
        >
          Publish
        </PrimaryButton>
      </div>

      <div className="relative flex min-h-[calc(100vh-140px)] flex-col items-center justify-center px-4 py-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,79,0,0.08),transparent_45%)]" />

        <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
          <ZapCell
            onClick={() => {
              setSelectedModalIndex(1);
            }}
            name={selectedTrigger?.name}
            image={selectedTrigger?.image}
            index={1}
            kind="trigger"
          />

          {selectedActions.map((action, i) => (
            <div key={action.index} className="flex w-full flex-col items-center">
              <NodeConnector />
              <ZapCell
                onClick={() => {
                  setSelectedModalIndex(action.index);
                }}
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : undefined
                }
                image={action.image}
                index={action.index}
                kind="action"
              />
              {i === selectedActions.length - 1 ? null : null}
            </div>
          ))}

          <NodeConnector />

          <button
            type="button"
            onClick={() => {
              setSelectedActions((a) => [
                ...a,
                {
                  index: a.length + 2,
                  availableActionId: "",
                  availableActionName: "",
                  metadata: {},
                },
              ]);
            }}
            className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-2xl font-bold text-white shadow-glow transition hover:bg-brand-deep active:scale-95"
            aria-label="Add action"
          >
            +
          </button>
          <div className="pt-3 text-sm text-muted">Add another action</div>
        </div>
      </div>

      {selectedModalIndex && (
        <Modal
          availableItems={
            selectedModalIndex === 1 ? availableTriggers : availableActions
          }
          onSelect={(
            props: null | {
              name: string;
              id: string;
              image?: string;
              metadata: any;
            }
          ) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex === 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name,
                image: props.image,
              });
            } else {
              setSelectedActions((a) => {
                const newActions = [...a];
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  availableActionId: props.id,
                  availableActionName: props.name,
                  image: props.image,
                  metadata: props.metadata,
                };
                return newActions;
              });
            }
            setSelectedModalIndex(null);
          }}
          index={selectedModalIndex}
        />
      )}
    </div>
  );
}

function Modal({
  index,
  onSelect,
  availableItems,
}: {
  index: number;
  onSelect: (
    props: null | { name: string; id: string; image?: string; metadata: any }
  ) => void;
  availableItems: AvailableItem[];
}) {
  const [step, setStep] = useState(0);
  const [selectedAction, setSelectedAction] = useState<{
    id: string;
    name: string;
    image?: string;
  }>();
  const isTrigger = index === 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-white shadow-glow">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <div className="font-display text-xl font-bold text-ink">
              Select {index === 1 ? "Trigger" : "Action"}
            </div>
            <div className="text-sm text-muted">
              {isTrigger
                ? "Choose what starts the workflow"
                : "Choose what happens next"}
            </div>
          </div>
          <button
            onClick={() => {
              onSelect(null);
            }}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted transition hover:bg-surface hover:text-ink"
          >
            <svg
              className="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="max-h-[70vh] space-y-3 overflow-y-auto p-5">
          {step === 1 && selectedAction?.id === "email" && (
            <EmailSelector
              setMetadata={(metadata) => {
                onSelect({
                  ...selectedAction,
                  metadata,
                });
              }}
            />
          )}

          {step === 1 && selectedAction?.id === "send-sol" && (
            <SolanaSelector
              setMetadata={(metadata) => {
                onSelect({
                  ...selectedAction,
                  metadata,
                });
              }}
            />
          )}

          {step === 0 && (
            <div className="space-y-2">
              {availableItems.map(({ id, name, image }) => {
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => {
                      if (isTrigger) {
                        onSelect({
                          id,
                          name,
                          image,
                          metadata: {},
                        });
                      } else {
                        setStep((s) => s + 1);
                        setSelectedAction({
                          id,
                          name,
                          image,
                        });
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl border border-line px-4 py-3 text-left transition hover:border-brand hover:bg-brand/5"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      width={36}
                      height={36}
                      className="rounded-full border border-line object-cover"
                      alt={name}
                    />
                    <div>
                      <div className="font-semibold text-ink">{name}</div>
                      <div className="text-xs text-muted">{id}</div>
                    </div>
                  </button>
                );
              })}
              {availableItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-line p-6 text-center text-sm text-muted">
                  No options yet. Seed your database with available triggers and
                  actions.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  return (
    <div>
      <Input
        label={"To"}
        type={"text"}
        placeholder="To"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={"Body"}
        type={"text"}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="pt-4">
        <PrimaryButton
          onClick={() => {
            setMetadata({
              email,
              body,
            });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}

function SolanaSelector({
  setMetadata,
}: {
  setMetadata: (params: any) => void;
}) {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div>
      <Input
        label={"To"}
        type={"text"}
        placeholder="To"
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        label={"Amount"}
        type={"text"}
        placeholder="To"
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="pt-4">
        <PrimaryButton
          onClick={() => {
            setMetadata({
              amount,
              address,
            });
          }}
        >
          Submit
        </PrimaryButton>
      </div>
    </div>
  );
}
